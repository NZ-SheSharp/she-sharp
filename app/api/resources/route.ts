import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { resources, resourceAccessLogs } from '@/lib/db/schema';
import { eq, like, and, or, desc, asc, sql } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const isPublic = searchParams.get('public');

    // Build query conditions
    const conditions = [];
    
    if (category) {
      conditions.push(eq(resources.category, category));
    }
    
    if (search) {
      conditions.push(
        or(
          like(resources.title, `%${search}%`),
          like(resources.description, `%${search}%`)
        )
      );
    }
    
    if (isPublic === 'true') {
      conditions.push(eq(resources.isPublic, true));
    } else if (isPublic === 'false') {
      conditions.push(eq(resources.isPublic, false));
    }

    // Get resources with access counts
    const resourcesQuery = db
      .select({
        id: resources.id,
        title: resources.title,
        description: resources.description,
        category: resources.category,
        resourceType: resources.resourceType,
        fileUrl: resources.fileUrl,
        fileSize: resources.fileSize,
        mimeType: resources.mimeType,
        thumbnailUrl: resources.thumbnailUrl,
        isPublic: resources.isPublic,
        isMembersOnly: resources.isMembersOnly,
        requiredMembershipTier: resources.requiredMembershipTier,
        tags: resources.tags,
        metadata: resources.metadata,
        viewCount: resources.viewCount,
        downloadCount: resources.downloadCount,
        uploadedBy: resources.uploadedBy,
        createdAt: resources.createdAt,
        updatedAt: resources.updatedAt,
      })
      .from(resources);

    if (conditions.length > 0) {
      resourcesQuery.where(and(...conditions));
    }

    // Apply sorting
    if (sortBy === 'title') {
      resourcesQuery.orderBy(order === 'desc' ? desc(resources.title) : asc(resources.title));
    } else if (sortBy === 'viewCount') {
      resourcesQuery.orderBy(order === 'desc' ? desc(resources.viewCount) : asc(resources.viewCount));
    } else if (sortBy === 'downloadCount') {
      resourcesQuery.orderBy(order === 'desc' ? desc(resources.downloadCount) : asc(resources.downloadCount));
    } else {
      resourcesQuery.orderBy(order === 'desc' ? desc(resources.createdAt) : asc(resources.createdAt));
    }

    const allResources = await resourcesQuery;

    // Get user access permissions
    const user = await getUser();
    let userCanAccess = false;
    
    if (user) {
      // Check if user is member for members-only resources
      userCanAccess = true; // Simplified for now
    }

    // Filter resources based on access permissions
    const accessibleResources = allResources.filter(resource => {
      if (resource.isPublic) return true;
      if (!user) return false;
      if (resource.isMembersOnly && !userCanAccess) return false;
      return true;
    });

    // Group resources by category
    const categorizedResources = accessibleResources.reduce((acc, resource) => {
      const cat = resource.category || 'uncategorized';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(resource);
      return acc;
    }, {} as Record<string, typeof accessibleResources>);

    // Get category counts
    const categoryCounts = Object.entries(categorizedResources).map(([category, items]) => ({
      category,
      count: items.length,
    }));

    return NextResponse.json({
      resources: accessibleResources,
      categories: categoryCounts,
      total: accessibleResources.length,
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const isAdmin = user.roles?.some(r => r.roleType === 'admin' && r.isActive);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.resourceType || !data.fileUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create resource
    const [newResource] = await db
      .insert(resources)
      .values({
        title: data.title,
        description: data.description,
        category: data.category || 'general',
        resourceType: data.resourceType,
        fileUrl: data.fileUrl,
        fileSize: data.fileSize,
        mimeType: data.mimeType,
        thumbnailUrl: data.thumbnailUrl,
        isPublic: data.isPublic ?? true,
        isMembersOnly: data.isMembersOnly ?? false,
        requiredMembershipTier: data.requiredMembershipTier,
        tags: data.tags || [],
        metadata: data.metadata || {},
        uploadedBy: user.id,
      })
      .returning();

    return NextResponse.json({
      message: 'Resource created successfully',
      resource: newResource,
    });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    );
  }
}