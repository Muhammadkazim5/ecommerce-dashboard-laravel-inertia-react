# E-Commerce Dashboard

A modern, full-stack e-commerce dashboard built with Laravel, Inertia.js, and React. This project combines the power of a robust PHP backend with a reactive TypeScript/React frontend for managing e-commerce operations efficiently.

## 🎯 Project Overview

This is a professional-grade e-commerce management dashboard designed for handling:
- **Product Management**: Create, update, and manage product inventory
- **Order Management**: Track and process customer orders
- **User Management**: Manage admin users and permissions
- **Dashboard Analytics**: Real-time insights and metrics
- **Authentication**: Secure login with Fortify and PassKeys support

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 11.0
- **PHP Version**: 8.3+
- **Authentication**: Laravel Fortify, PassKeys
- **Database Migrations**: Laravel Eloquent ORM
- **API**: RESTful API with Inertia.js integration
- **Queue System**: Laravel Queue
- **Development Tools**: Laravel Pint (code formatting), PHPStan (static analysis), Pest (testing)

### Frontend
- **Framework**: React 19.2
- **TypeScript**: 5.7+ (70% of codebase)
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS 4.0
- **Build Tool**: Vite 8.0
- **State Management**: Inertia.js
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Code Quality**: ESLint, Prettier

### Infrastructure
- **Language Composition**: 
  - TypeScript: 70%
  - PHP: 27.5%
  - CSS: 1.2%
  - Other: 1.3%

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **PHP 8.3 or higher**
- **Node.js 18+ and npm 9+**
- **Composer** (PHP package manager)
- **Git**
- **SQLite** or **MySQL** (for database)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Muhammadkazim5/ecommerce-dashboard-laravel-inertia-react.git
cd ecommerce-dashboard-laravel-inertia-react
```

### 2. Automated Setup
```bash
composer run setup
```

This command will automatically:
- Install PHP dependencies via Composer
- Create `.env` file from `.env.example`
- Generate application key
- Run database migrations
- Install Node dependencies
- Build frontend assets

### 3. Manual Setup (Alternative)

If you prefer to set up manually:

```bash
# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Install Node dependencies
npm install

# Build frontend
npm run build
```

## 🏃 Running the Application

### Development Mode
```bash
composer run dev
```

This starts:
- Laravel development server (port 8000)
- Queue listener for background jobs
- Pail for real-time logs
- Vite dev server for hot module reloading

### Production Build
```bash
npm run build
```

### Serve Only
```bash
php artisan serve --host=localhost
```

## 📝 Available Scripts

### PHP/Laravel Scripts
```bash
# Run tests
composer test

# Code formatting and linting
composer run lint
composer run lint:check

# Type checking (PHPStan)
composer run types:check

# CI/CD checks
composer run ci:check

# Development server with queue and logs
composer run dev
```

### Frontend Scripts
```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Build with SSR
npm run build:ssr

# Code formatting
npm run format
npm run format:check

# Linting
npm run lint
npm run lint:check

# Type checking
npm run types:check
```

## 📁 Project Structure

```
.
├── app/                          # Laravel application code
│   ├── Http/Controllers/        # API controllers
│   ├── Models/                  # Eloquent models
│   └── ...
├── resources/
│   ├── js/                      # React/TypeScript components
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   └── ...
│   ├── css/                     # Tailwind CSS styles
│   └── views/                   # Blade templates
├── database/
│   ├── migrations/              # Database migrations
│   ├── factories/               # Model factories
│   └── seeders/                 # Database seeders
├── routes/                      # API and web routes
├── storage/                     # Laravel storage (logs, uploads)
├── tests/                       # Test files (Pest)
├── package.json                 # Node.js dependencies
├── composer.json                # PHP dependencies
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── tailwind.config.js          # Tailwind CSS configuration
```

## 🔑 Key Features

- ✅ **Modern UI**: Built with Radix UI and Tailwind CSS
- ✅ **Full TypeScript Support**: Type-safe React components
- ✅ **Authentication**: Secure auth with PassKeys support
- ✅ **Real-time Updates**: Inertia.js for seamless page transitions
- ✅ **Testing**: Pest for backend, comprehensive test coverage
- ✅ **Code Quality**: ESLint, Prettier, PHPStan for code consistency
- ✅ **Hot Module Reloading**: Vite for instant development feedback
- ✅ **Database Migrations**: Robust schema versioning

## 🔒 Security Features

- Laravel Fortify for authentication
- PassKeys support for modern authentication
- CSRF protection
- SQL injection prevention with Eloquent ORM
- Type safety with TypeScript and PHPStan

## 📚 Database

The project uses SQLite by default (development-friendly) but supports MySQL and PostgreSQL.

### Running Migrations
```bash
php artisan migrate
```

### Creating New Migration
```bash
php artisan make:migration create_table_name --create=table_name
```

### Seeding Database
```bash
php artisan db:seed
```

## 🧪 Testing

### Run All Tests
```bash
composer test
```

### Run Specific Test
```bash
php artisan test --filter TestClassName
```

### Test with Coverage
```bash
php artisan test --coverage
```

Tests are written using Pest and located in the `tests/` directory.

## 📊 Code Quality

The project maintains high code quality standards:

### PHP Code Quality
```bash
composer run types:check  # PHPStan analysis
composer run lint:check   # Pint formatting check
```

### JavaScript/TypeScript Quality
```bash
npm run types:check       # TypeScript compilation
npm run lint:check        # ESLint check
npm run format:check      # Prettier format check
```

### CI/CD Pipeline
```bash
composer run ci:check     # Runs all checks
```

## 📦 Dependencies

### Key Backend Packages
- **laravel/framework**: ^11.0
- **inertiajs/inertia-laravel**: ^3.0
- **laravel/fortify**: ^1.37.2
- **laravel/chisel**: ^0.1.0
- **laravel/wayfinder**: ^0.1.14

### Key Frontend Packages
- **@inertiajs/react**: ^3.0.0
- **@radix-ui/**: UI component library
- **tailwindcss**: ^4.0.0
- **typescript**: ^5.7.2
- **vite**: ^8.0.0
- **react**: ^19.2.0

## 🌐 Environment Configuration

Create a `.env` file in the root directory:

```env
APP_NAME="E-Commerce Dashboard"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

FORTIFY_GUARD=web
SESSION_DRIVER=database
```

## 📖 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Inertia.js Documentation](https://inertiajs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure code quality checks pass:
```bash
composer run ci:check
```

## 📄 License

This project is open-source software licensed under the [MIT license](LICENSE).

## 🙋 Support

For issues, questions, or suggestions, please:
1. Check existing [GitHub Issues](https://github.com/Muhammadkazim5/ecommerce-dashboard-laravel-inertia-react/issues)
2. Create a new issue with detailed information
3. Include error messages and environment details

## 👤 Author

**Muhammad Kazim**
- GitHub: [@Muhammadkazim5](https://github.com/Muhammadkazim5)

## 🎉 Acknowledgments

- Laravel Community
- React Community
- Inertia.js Team
- All contributors and supporters

---

**Happy Coding! 🚀**

For the latest updates, don't forget to ⭐ star this repository!
