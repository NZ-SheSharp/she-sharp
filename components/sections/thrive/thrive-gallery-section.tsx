'use client'

import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { ThriveGallery } from '@/components/events/thrive/ThriveGallery'

export function ThriveGallerySection() {
  return (
    <Section bgColor="accent">
      <Container size="wide">
        <ThriveGallery googlePhotosUrl="https://photos.app.goo.gl/uFDurrb7TtarkGS67" />
      </Container>
    </Section>
  )
}