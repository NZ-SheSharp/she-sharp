# She Sharp - Connecting Women in Technology

She Sharp is a New Zealand registered charity (#CC57025) on a mission to bridge the gender gap in STEM, one woman at a time.

## 🌟 About

She Sharp empowers women in technology through:
- **Events** - Keynote speakers, panels, workshops, and networking
- **Mentorship** - Connecting experienced professionals with aspiring women in tech
- **Community** - Building a supportive network of 2200+ members
- **Opportunities** - Career development and skill-building programs

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) 
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: Custom JWT-based auth
- **Payments**: [Stripe](https://stripe.com/) integration
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database
- Stripe account (for payment features)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/ChanMeng666/she-sharp.git
cd she-sharp
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` with:
   - Database connection string
   - Stripe API keys
   - Authentication secret
   - Base URL

5. Set up the database:
```bash
pnpm db:setup
pnpm db:migrate
```

6. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
she-sharp/
├── app/                    # Next.js app directory
│   ├── (site)/            # Public website pages
│   ├── (dashboard)/       # Protected dashboard (future)
│   └── (login)/           # Authentication pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── lib/                   # Utilities and configs
│   ├── auth/             # Authentication logic
│   ├── db/               # Database schema and queries
│   └── constants/        # App constants
├── public/               # Static assets
└── docs/                 # Project documentation
```

## 🎨 Design System

The project uses a custom color palette:
- **Purple** (#9b2e83) - Primary brand color
- **Periwinkle** (#8982ff) - Accent color
- **Navy** (#1f1e44) - Text color
- **Mint** (#b1f6e9) - Success/highlight color

See [Color Guide](./docs/development/COLOR_GUIDE.md) for detailed usage.

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:
- [Development Plan](./docs/development/SHE_SHARP_DEVELOPMENT_PLAN.md)
- [Component Guide](./docs/components/SHADCN_UI_COMPONENT_GUIDE.md)
- [Backend Integration](./docs/development/BACKEND_INTEGRATION_PLAN.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- All our amazing volunteers and team members
- Our sponsors who make this work possible
- The 2200+ She Sharp community members

## 📞 Contact

- Website: [shesharp.org.nz](https://www.shesharp.org.nz)
- Email: [Contact Form](https://www.shesharp.org.nz/contact)

---

Built with 💜 by the She Sharp team