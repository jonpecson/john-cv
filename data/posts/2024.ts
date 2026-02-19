import { BlogPost } from '@/types/blog'
import { h2, h3, p, code, ul, ol, blockquote } from '@/lib/portable-text-helpers'

export function getPosts2024(): BlogPost[] {
  return [
    // ─── JANUARY ──────────────────────────────────────────────────────
    {
      _id: '2024-01',
      title: 'Next.js 14 App Router Deep Dive',
      slug: { current: 'nextjs-14-app-router-deep-dive' },
      excerpt:
        'An in-depth exploration of the Next.js 14 App Router, covering layouts, loading states, error boundaries, and advanced data fetching patterns.',
      publishedAt: '2024-01-08',
      author: 'John Pecson',
      categories: ['Next.js', 'React', 'Web Development'],
      mainImage:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      body: [
        h2('Why the App Router Changes Everything'),
        p(
          'Next.js 14 solidifies the App Router as the recommended way to build React applications. The shift from the Pages Router to the App Router is not just a cosmetic change; it fundamentally alters how we think about data fetching, layouts, and component architecture. With React Server Components at its core, the App Router enables a new paradigm where most of your UI renders on the server by default.',
        ),
        p(
          'In this post, we will walk through the key features of the App Router, examine real-world patterns, and discuss migration strategies for existing projects.',
        ),
        h2('File-Based Routing with Layouts'),
        p(
          'The App Router introduces a new file convention. Each route segment maps to a folder, and special files like layout.tsx, page.tsx, loading.tsx, and error.tsx control different aspects of that segment. Layouts persist across navigations, which means they do not re-render when a child route changes.',
        ),
        code(
          'tsx',
          `// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}`,
          'app/dashboard/layout.tsx',
        ),
        h2('Server Components and Data Fetching'),
        p(
          'By default, every component in the App Router is a React Server Component. This means you can fetch data directly in your component using async/await without useEffect or external libraries. The data is fetched on the server and streamed to the client, resulting in faster page loads and smaller JavaScript bundles.',
        ),
        code(
          'tsx',
          `// app/dashboard/page.tsx
async function getDashboardData() {
  const res = await fetch('https://api.example.com/dashboard', {
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  })
  return res.json()
}

export default async function DashboardPage() {
  const data = await getDashboardData()
  return <DashboardView data={data} />
}`,
          'app/dashboard/page.tsx',
        ),
        h3('Key Benefits'),
        ...ul([
          'Zero client-side JavaScript for server components',
          'Built-in streaming with Suspense boundaries',
          'Simplified data fetching without useEffect',
          'Automatic request deduplication with fetch',
          'Granular caching control with revalidate options',
        ]),
        blockquote(
          'The App Router is not just an improvement; it represents a fundamental shift in how we architect React applications for production.',
        ),
        h2('Error Handling and Loading States'),
        p(
          'The App Router provides first-class support for error and loading states through special files. A loading.tsx file automatically wraps the page in a Suspense boundary, while error.tsx catches runtime errors and renders a fallback UI. This convention-based approach eliminates boilerplate and ensures consistent error handling across your application.',
        ),
      ],
    },

    {
      _id: '2024-02',
      title: 'Smart Contract Security Patterns',
      slug: { current: 'smart-contract-security-patterns' },
      excerpt:
        'Learn the essential security patterns every Solidity developer must know to protect smart contracts from common vulnerabilities.',
      publishedAt: '2024-01-18',
      author: 'John Pecson',
      categories: ['Blockchain', 'Solidity', 'Security'],
      mainImage:
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
      body: [
        h2('The Stakes of Smart Contract Security'),
        p(
          'Smart contracts are immutable once deployed. A single vulnerability can lead to millions of dollars in losses, as we have seen repeatedly in DeFi hacks. Unlike traditional software where you can push a hotfix, smart contracts require rigorous security practices before deployment. This guide covers the most critical security patterns every Solidity developer should implement.',
        ),
        h2('Reentrancy Protection'),
        p(
          'Reentrancy is one of the most notorious vulnerabilities in smart contract development. It occurs when an external contract call allows the called contract to re-enter the calling function before the first execution completes. The Checks-Effects-Interactions pattern is the primary defense.',
        ),
        code(
          'solidity',
          `// VULNERABLE - DO NOT USE
function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount);
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
    balances[msg.sender] -= amount; // State updated AFTER external call
}

// SECURE - Checks-Effects-Interactions
function withdraw(uint256 amount) external nonReentrant {
    require(balances[msg.sender] >= amount); // Check
    balances[msg.sender] -= amount;          // Effect
    (bool success, ) = msg.sender.call{value: amount}(""); // Interaction
    require(success);
}`,
          'ReentrancyExample.sol',
        ),
        h2('Access Control Patterns'),
        p(
          'Proper access control ensures that only authorized addresses can call sensitive functions. OpenZeppelin provides battle-tested implementations like Ownable and AccessControl that should be used instead of custom implementations.',
        ),
        h3('Common Security Patterns'),
        ...ul([
          'Checks-Effects-Interactions: Always update state before making external calls',
          'Pull over Push: Let users withdraw funds instead of pushing to them',
          'Rate Limiting: Implement time locks and transaction limits',
          'Circuit Breaker: Add emergency pause functionality with Pausable',
          'Access Control: Use role-based permissions instead of simple owner checks',
        ]),
        code(
          'solidity',
          `import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract SecureVault is ReentrancyGuard, Pausable, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    function deposit() external payable whenNotPaused {
        balances[msg.sender] += msg.value;
    }

    function emergencyPause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }
}`,
          'SecureVault.sol',
        ),
        blockquote(
          'In smart contract development, security is not an afterthought. It must be the foundation of every design decision.',
        ),
        h2('Audit and Testing'),
        p(
          'No amount of patterns replaces thorough testing. Write comprehensive unit tests, use fuzzing tools like Echidna, run static analysis with Slither, and always get a professional audit before deploying contracts that handle significant value. Combine automated tools with manual code review for the best coverage.',
        ),
      ],
    },

    {
      _id: '2024-03',
      title: 'React Server Components: A Complete Guide',
      slug: { current: 'react-server-components-complete-guide' },
      excerpt:
        'A comprehensive guide to React Server Components, including when to use them, how they work under the hood, and practical migration patterns.',
      publishedAt: '2024-01-28',
      author: 'John Pecson',
      categories: ['React', 'Next.js', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      body: [
        h2('Understanding Server Components'),
        p(
          'React Server Components (RSC) represent the biggest shift in React since hooks. They allow components to run exclusively on the server, meaning they never ship JavaScript to the client. This results in smaller bundles, faster page loads, and direct access to server-side resources like databases and file systems.',
        ),
        p(
          'The key insight behind RSC is that not every component needs interactivity. Many components simply fetch data and render HTML. By keeping these on the server, we eliminate the cost of sending their JavaScript to the browser.',
        ),
        h2('Server vs Client Components'),
        p(
          'In the RSC model, components are server components by default. To make a component interactive (client-side), you add the "use client" directive at the top of the file. This creates a clear boundary between server and client code.',
        ),
        code(
          'tsx',
          `// Server Component (default) - no directive needed
async function PostList() {
  const posts = await db.query('SELECT * FROM posts ORDER BY created_at DESC')
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

// Client Component - needs "use client" directive
'use client'
import { useState } from 'react'

function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false)
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? 'Unlike' : 'Like'}
    </button>
  )
}`,
        ),
        h3('When to Use Each Type'),
        ...ul([
          'Server Components: Data fetching, accessing backend resources, keeping sensitive data on the server, large dependencies that should not ship to the client',
          'Client Components: Interactivity (onClick, onChange), browser APIs (localStorage, geolocation), state management (useState, useReducer), lifecycle effects (useEffect)',
        ]),
        h2('Composition Patterns'),
        p(
          'A common misconception is that once you use a client component, everything below it must also be a client component. This is not true. You can pass server components as children to client components, maintaining the server boundary where it matters.',
        ),
        code(
          'tsx',
          `// This works! Server component passed as children to client component
import ClientWrapper from './ClientWrapper'
import ServerContent from './ServerContent'

export default function Page() {
  return (
    <ClientWrapper>
      <ServerContent /> {/* Still renders on the server */}
    </ClientWrapper>
  )
}`,
        ),
        blockquote(
          'The goal is not to make everything a server component. The goal is to move the server-client boundary to the right place for your use case.',
        ),
        h2('Performance Impact'),
        p(
          'In our production applications, adopting RSC reduced JavaScript bundle size by 30-40%. Initial page load times improved significantly because the browser has less JavaScript to parse and execute. Combined with streaming, users see meaningful content faster than ever before.',
        ),
      ],
    },

    // ─── FEBRUARY ─────────────────────────────────────────────────────
    {
      _id: '2024-04',
      title: 'Building REST APIs with NestJS and PostgreSQL',
      slug: { current: 'building-rest-apis-nestjs-postgresql' },
      excerpt:
        'A step-by-step guide to building production-ready REST APIs with NestJS, TypeORM, and PostgreSQL, including authentication and validation.',
      publishedAt: '2024-02-07',
      author: 'John Pecson',
      categories: ['NestJS', 'PostgreSQL', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
      body: [
        h2('Why NestJS for Backend Development'),
        p(
          'NestJS has become the go-to framework for building scalable Node.js server-side applications. Its opinionated architecture, inspired by Angular, brings structure and consistency to backend development. Combined with PostgreSQL through TypeORM, it provides a robust foundation for production APIs.',
        ),
        p(
          'In this guide, we will build a complete REST API with CRUD operations, authentication, validation, and proper error handling.',
        ),
        h2('Project Setup and Configuration'),
        code(
          'bash',
          `# Create a new NestJS project
nest new my-api
cd my-api

# Install dependencies
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/config class-validator class-transformer
npm install @nestjs/passport passport passport-jwt @nestjs/jwt`,
          'terminal',
        ),
        h2('Defining Entities with TypeORM'),
        p(
          'TypeORM entities map directly to PostgreSQL tables. Decorators define column types, constraints, and relationships. This declarative approach keeps your schema close to your code.',
        ),
        code(
          'typescript',
          `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date
}`,
          'user.entity.ts',
        ),
        h2('Building the Service Layer'),
        p(
          'NestJS services encapsulate business logic and data access. They are injectable, testable, and follow the single responsibility principle. The repository pattern provided by TypeORM integrates seamlessly.',
        ),
        code(
          'typescript',
          `@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'email', 'isActive', 'createdAt'],
    })
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    })
    return this.usersRepository.save(user)
  }
}`,
          'users.service.ts',
        ),
        h3('Key NestJS Features Used'),
        ...ul([
          'Dependency injection for loose coupling between modules',
          'Decorators for declarative route definitions and validation',
          'Guards for authentication and authorization middleware',
          'Interceptors for response transformation and logging',
          'Pipes for input validation using class-validator',
        ]),
        blockquote(
          'A well-structured NestJS API should feel familiar to any developer who has worked with strongly-typed backend frameworks.',
        ),
      ],
    },

    {
      _id: '2024-05',
      title: 'Docker Containerization for Node.js Applications',
      slug: { current: 'docker-containerization-nodejs' },
      excerpt:
        'Learn how to containerize Node.js applications with Docker, including multi-stage builds, optimization techniques, and production best practices.',
      publishedAt: '2024-02-20',
      author: 'John Pecson',
      categories: ['Docker', 'Node.js', 'DevOps'],
      mainImage:
        'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
      body: [
        h2('Docker Fundamentals for Node.js'),
        p(
          'Docker containers provide a consistent environment for running Node.js applications across development, staging, and production. A well-crafted Dockerfile can reduce image size by 80% and improve build times dramatically through layer caching. This guide covers the essential techniques for production-grade Node.js Docker images.',
        ),
        h2('Multi-Stage Builds'),
        p(
          'Multi-stage builds are the single most impactful optimization for Node.js Docker images. By separating the build stage from the production stage, you avoid shipping development dependencies and build tools in your final image.',
        ),
        code(
          'dockerfile',
          `# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
USER nestjs
EXPOSE 3000
CMD ["node", "dist/main.js"]`,
          'Dockerfile',
        ),
        h2('Optimization Techniques'),
        h3('Layer Caching'),
        p(
          'Docker caches each layer in the Dockerfile. By copying package.json before the rest of the source code, npm install only re-runs when dependencies change, not on every code change. This alone can save minutes on each build.',
        ),
        h3('Image Size Reduction'),
        ...ul([
          'Use Alpine-based images (node:20-alpine) for a smaller base',
          'Use npm ci instead of npm install for deterministic builds',
          'Add a .dockerignore file to exclude node_modules, .git, and test files',
          'Run as a non-root user for security',
          'Use COPY --chown to avoid extra permission-fixing layers',
        ]),
        h2('Docker Compose for Development'),
        code(
          'yaml',
          `version: '3.8'
services:
  app:
    build:
      context: .
      target: builder
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`,
          'docker-compose.yml',
        ),
        blockquote(
          'A good Docker setup eliminates the "works on my machine" problem and makes deployments predictable and reproducible.',
        ),
      ],
    },

    {
      _id: '2024-26',
      title: 'Tailwind CSS Advanced Techniques',
      slug: { current: 'tailwind-css-advanced-techniques' },
      excerpt:
        'Go beyond the basics with Tailwind CSS. Learn advanced techniques including custom plugins, dynamic theming, animation utilities, and responsive design patterns.',
      publishedAt: '2024-02-28',
      author: 'John Pecson',
      categories: ['CSS', 'Tailwind', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
      body: [
        h2('Beyond Utility Classes'),
        p(
          'Tailwind CSS is far more than a collection of utility classes. Its plugin system, theming capabilities, and configuration options make it a powerful design system foundation. Once you understand these advanced features, you can build complex, maintainable UIs without ever leaving Tailwind.',
        ),
        h2('Custom Plugin Development'),
        p(
          'Tailwind plugins let you register new utilities, components, and variants. This is how you extend Tailwind to match your design system without writing custom CSS files.',
        ),
        code(
          'javascript',
          `// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function ({ addUtilities, addComponents, theme }) {
      // Custom utility
      addUtilities({
        '.text-gradient': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-image': \`linear-gradient(135deg, \${theme('colors.blue.500')}, \${theme('colors.purple.500')})\`,
        },
      })

      // Custom component
      addComponents({
        '.glass-card': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'border-radius': theme('borderRadius.xl'),
        },
      })
    }),
  ],
}`,
          'tailwind.config.js',
        ),
        h2('Dynamic Theming with CSS Variables'),
        p(
          'Combining Tailwind with CSS custom properties allows for dynamic themes that can be toggled at runtime without rebuilding your CSS. This pattern is used by shadcn/ui and many modern component libraries.',
        ),
        code(
          'css',
          `@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
  }
}`,
          'globals.css',
        ),
        h3('Animation Techniques'),
        ...ul([
          'Use the animate-* utilities with custom keyframes for micro-interactions',
          'Combine transition-all with duration and easing classes for smooth hover effects',
          'Create entrance animations using @keyframes in your config',
          'Use the group and peer variants for interactive state animations',
        ]),
        blockquote(
          'The best CSS is the CSS you do not have to write. Tailwind gives you the primitives to build any design without leaving your markup.',
        ),
        p(
          'As your project grows, consider extracting repeated Tailwind patterns into component abstractions rather than @apply directives. Component-level abstraction through React components is more maintainable than CSS-level abstraction.',
        ),
      ],
    },

    // ─── MARCH ────────────────────────────────────────────────────────
    {
      _id: '2024-06',
      title: 'Web3 Wallet Integration with Ethers.js',
      slug: { current: 'web3-wallet-integration-ethersjs' },
      excerpt:
        'A practical guide to integrating Web3 wallets into frontend applications using Ethers.js, covering MetaMask, WalletConnect, and transaction handling.',
      publishedAt: '2024-03-05',
      author: 'John Pecson',
      categories: ['Web3', 'Ethereum', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&h=400&fit=crop',
      body: [
        h2('Connecting Users to the Blockchain'),
        p(
          'Web3 wallet integration is the gateway between your frontend application and the blockchain. Whether users connect with MetaMask, WalletConnect, or Coinbase Wallet, the experience should be seamless. Ethers.js v6 provides a clean, well-typed API for interacting with Ethereum and EVM-compatible chains.',
        ),
        h2('Setting Up the Provider'),
        p(
          'The provider is your read-only connection to the blockchain. A signer, obtained from the user wallet, adds the ability to send transactions. Understanding this distinction is fundamental to working with Ethers.js.',
        ),
        code(
          'typescript',
          `import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers'

async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('No wallet detected. Please install MetaMask.')
  }

  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()
  const balance = await provider.getBalance(address)

  return {
    provider,
    signer,
    address,
    balance: formatEther(balance),
  }
}`,
          'wallet.ts',
        ),
        h2('Interacting with Smart Contracts'),
        p(
          'Once you have a signer, you can interact with any smart contract by providing its ABI and address. Ethers.js automatically generates typed methods based on the ABI, giving you a clean interface for contract calls.',
        ),
        code(
          'typescript',
          `const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
]

async function getTokenBalance(
  tokenAddress: string,
  walletAddress: string,
  provider: BrowserProvider,
) {
  const contract = new Contract(tokenAddress, ERC20_ABI, provider)
  const balance = await contract.balanceOf(walletAddress)
  return formatEther(balance)
}

async function sendTokens(
  tokenAddress: string,
  to: string,
  amount: string,
  signer: Signer,
) {
  const contract = new Contract(tokenAddress, ERC20_ABI, signer)
  const tx = await contract.transfer(to, parseEther(amount))
  await tx.wait() // Wait for transaction confirmation
  return tx.hash
}`,
          'contracts.ts',
        ),
        h3('Wallet Connection Best Practices'),
        ...ul([
          'Always handle chain switching gracefully with wallet_switchEthereumChain',
          'Listen for accountsChanged and chainChanged events to update UI',
          'Store the connection state but never store private keys',
          'Implement proper error messages for rejected transactions',
          'Support multiple wallet providers using a wallet abstraction layer',
        ]),
        blockquote(
          'A great Web3 UX makes the blockchain invisible. Users should interact with your app, not wrestle with wallet pop-ups.',
        ),
      ],
    },

    {
      _id: '2024-07',
      title: 'AWS ECS Deployment Guide for Production Apps',
      slug: { current: 'aws-ecs-deployment-guide' },
      excerpt:
        'Deploy containerized applications to AWS ECS Fargate with load balancing, auto-scaling, and zero-downtime deployments.',
      publishedAt: '2024-03-22',
      author: 'John Pecson',
      categories: ['AWS', 'DevOps', 'Docker'],
      mainImage:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      body: [
        h2('ECS Fargate: Serverless Containers'),
        p(
          'AWS ECS Fargate lets you run containers without managing servers. You define your task (container configuration), service (how many instances), and cluster (the logical grouping), and AWS handles the rest. Combined with Application Load Balancer and auto-scaling, it provides a production-grade deployment platform.',
        ),
        h2('Architecture Overview'),
        p(
          'A typical ECS production deployment consists of a VPC with public and private subnets, an Application Load Balancer in public subnets, and ECS tasks running in private subnets. The ALB handles SSL termination and routes traffic to healthy containers.',
        ),
        h3('Core Components'),
        ...ol([
          'ECR Repository: Stores your Docker images',
          'Task Definition: Specifies container image, CPU, memory, ports, and environment variables',
          'ECS Service: Manages desired task count, load balancer integration, and deployments',
          'ALB + Target Group: Routes external traffic to containers with health checks',
          'Auto Scaling: Adjusts task count based on CPU, memory, or custom metrics',
        ]),
        h2('Task Definition Configuration'),
        code(
          'json',
          `{
  "family": "my-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "api",
      "image": "123456789.dkr.ecr.us-east-1.amazonaws.com/my-api:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/my-api",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}`,
          'task-definition.json',
        ),
        h2('Zero-Downtime Deployments'),
        p(
          'ECS supports rolling deployments out of the box. When you update a service, ECS launches new tasks with the new version, waits for them to pass health checks, then drains connections from old tasks before terminating them. Configure deployment parameters to control the rollout speed and minimum healthy percentage.',
        ),
        blockquote(
          'Fargate eliminates undifferentiated heavy lifting. Focus on your application, not on patching EC2 instances.',
        ),
      ],
    },

    // ─── APRIL ────────────────────────────────────────────────────────
    {
      _id: '2024-08',
      title: 'Advanced TypeScript Patterns for Large Codebases',
      slug: { current: 'advanced-typescript-patterns' },
      excerpt:
        'Master advanced TypeScript patterns including discriminated unions, template literal types, branded types, and conditional types for maintainable codebases.',
      publishedAt: '2024-04-03',
      author: 'John Pecson',
      categories: ['TypeScript', 'Architecture', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      body: [
        h2('Type Safety at Scale'),
        p(
          'TypeScript shines in large codebases where type safety prevents entire categories of bugs. But basic type annotations only scratch the surface. Advanced patterns like discriminated unions, branded types, and conditional types let you encode business logic in the type system, catching errors at compile time rather than runtime.',
        ),
        h2('Discriminated Unions'),
        p(
          'Discriminated unions are essential for modeling states that have different shapes. By using a literal type as a discriminant, TypeScript can narrow the type in switch statements and conditionals.',
        ),
        code(
          'typescript',
          `type ApiResponse<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string; retryable: boolean }

function handleResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case 'loading':
      return <Spinner />
    case 'success':
      return <DataView data={response.data} /> // TS knows data exists
    case 'error':
      return response.retryable // TS knows error and retryable exist
        ? <RetryButton />
        : <ErrorMessage message={response.error} />
  }
}`,
          'api-response.ts',
        ),
        h2('Branded Types'),
        p(
          'Branded types prevent mixing up primitive values that represent different things. A userId and a postId are both strings, but passing one where the other is expected is a bug. Branded types catch this at compile time.',
        ),
        code(
          'typescript',
          `type Brand<T, B extends string> = T & { __brand: B }

type UserId = Brand<string, 'UserId'>
type PostId = Brand<string, 'PostId'>

function createUserId(id: string): UserId {
  return id as UserId
}

function getPost(postId: PostId) { /* ... */ }

const userId = createUserId('user-123')
// getPost(userId) // Error: UserId is not assignable to PostId`,
          'branded-types.ts',
        ),
        h3('Essential Patterns for Large Codebases'),
        ...ul([
          'Discriminated unions for state machines and API responses',
          'Branded types for domain-specific identifiers',
          'Template literal types for string-based APIs and routing',
          'Conditional types for flexible generic utilities',
          'The satisfies operator for type checking without widening',
          'Const assertions (as const) for literal inference',
        ]),
        blockquote(
          'The best TypeScript code reads like documentation. When types are precise, the code becomes self-explanatory.',
        ),
        h2('Practical Tips'),
        p(
          'Adopt these patterns incrementally. Start with discriminated unions for your API layer, then introduce branded types for identifiers. Use the satisfies operator whenever you want type checking without losing literal types. As your team gains comfort, introduce more advanced patterns like conditional types and mapped types.',
        ),
      ],
    },

    {
      _id: '2024-09',
      title: 'Real-Time Systems with WebSockets and Node.js',
      slug: { current: 'realtime-systems-websockets-nodejs' },
      excerpt:
        'Build scalable real-time systems using WebSockets with Node.js. Covers Socket.IO, scaling with Redis, and patterns for live data applications.',
      publishedAt: '2024-04-19',
      author: 'John Pecson',
      categories: ['WebSocket', 'Node.js', 'Real-time'],
      mainImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      body: [
        h2('The Real-Time Web'),
        p(
          'Real-time communication is central to modern web applications. From live trading dashboards to collaborative editing, WebSockets provide the bidirectional, low-latency connection that HTTP polling cannot match. In this post, we explore building robust real-time systems with Node.js.',
        ),
        h2('WebSocket Server with Socket.IO'),
        p(
          'Socket.IO provides a reliable WebSocket implementation with automatic reconnection, room-based messaging, and graceful fallback to HTTP long-polling when WebSockets are not available.',
        ),
        code(
          'typescript',
          `import { Server } from 'socket.io'
import { createServer } from 'http'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: { origin: 'https://app.example.com' },
})

// Redis adapter for horizontal scaling
const pubClient = createClient({ url: process.env.REDIS_URL })
const subClient = pubClient.duplicate()
await Promise.all([pubClient.connect(), subClient.connect()])
io.adapter(createAdapter(pubClient, subClient))

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('join-room', (roomId: string) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-joined', { userId: socket.data.userId })
  })

  socket.on('message', ({ roomId, content }) => {
    io.to(roomId).emit('new-message', {
      userId: socket.data.userId,
      content,
      timestamp: Date.now(),
    })
  })
})

httpServer.listen(3001)`,
          'socket-server.ts',
        ),
        h2('Scaling with Redis Pub/Sub'),
        p(
          'A single WebSocket server can handle thousands of concurrent connections, but production systems need horizontal scaling. The Redis adapter for Socket.IO enables multiple server instances to share state. When one server receives a message, Redis broadcasts it to all other servers, which then forward it to their connected clients.',
        ),
        h3('Scaling Considerations'),
        ...ul([
          'Use Redis adapter for multi-instance state sharing',
          'Implement heartbeat pings to detect and clean up stale connections',
          'Use rooms and namespaces to segment traffic efficiently',
          'Add authentication middleware to verify JWT tokens on connection',
          'Monitor connection counts and message throughput per instance',
        ]),
        h2('Client-Side Integration'),
        code(
          'typescript',
          `import { io, Socket } from 'socket.io-client'
import { useEffect, useRef } from 'react'

function useSocket(url: string, token: string) {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socket = io(url, {
      auth: { token },
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    })

    socket.on('connect', () => console.log('Connected'))
    socket.on('disconnect', (reason) => console.log('Disconnected:', reason))

    socketRef.current = socket
    return () => { socket.disconnect() }
  }, [url, token])

  return socketRef
}`,
          'useSocket.ts',
        ),
        blockquote(
          'Real-time features delight users, but poorly implemented WebSockets can cripple your infrastructure. Plan for scale from day one.',
        ),
      ],
    },

    // ─── MAY ──────────────────────────────────────────────────────────
    {
      _id: '2024-10',
      title: 'CI/CD Pipelines with GitHub Actions',
      slug: { current: 'cicd-pipelines-github-actions' },
      excerpt:
        'Design robust CI/CD pipelines using GitHub Actions. Covers testing, building, deploying, and advanced workflow patterns for production applications.',
      publishedAt: '2024-05-06',
      author: 'John Pecson',
      categories: ['CI/CD', 'DevOps', 'GitHub'],
      mainImage:
        'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop',
      body: [
        h2('Automating Your Development Workflow'),
        p(
          'GitHub Actions has become the standard for CI/CD in modern development teams. Its tight integration with GitHub, extensive marketplace, and matrix strategy support make it ideal for testing across environments, building Docker images, and deploying to cloud providers. A well-designed pipeline catches bugs early and ships code confidently.',
        ),
        h2('A Production-Ready Workflow'),
        code(
          'yaml',
          `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm test -- --coverage
      - uses: codecov/codecov-action@v3

  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: |
          aws ecs update-service \\
            --cluster production \\
            --service my-api \\
            --force-new-deployment`,
          '.github/workflows/deploy.yml',
        ),
        h3('Pipeline Best Practices'),
        ...ol([
          'Run tests in parallel using matrix strategies across Node versions and OS',
          'Cache dependencies with actions/cache or built-in cache support',
          'Use environment protection rules with required reviewers for production',
          'Pin action versions to specific SHAs for security',
          'Store secrets in GitHub Secrets, never in workflow files',
          'Use concurrency groups to cancel redundant runs',
        ]),
        h2('Advanced Patterns'),
        p(
          'For monorepos, use path filters to only trigger workflows when relevant files change. For complex deployments, use reusable workflows to share logic across repositories. Composite actions let you bundle multiple steps into a single reusable unit, keeping your workflow files clean.',
        ),
        blockquote(
          'The fastest way to ship confidently is to automate everything between a git push and production.',
        ),
      ],
    },

    {
      _id: '2024-11',
      title: 'Redis Caching Strategies for High-Traffic Applications',
      slug: { current: 'redis-caching-strategies' },
      excerpt:
        'Implement effective caching strategies with Redis to handle high traffic loads. Covers cache-aside, write-through, TTL strategies, and cache invalidation patterns.',
      publishedAt: '2024-05-21',
      author: 'John Pecson',
      categories: ['Redis', 'Performance', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      body: [
        h2('Why Caching Matters'),
        p(
          'Database queries are the most common bottleneck in web applications. Redis, an in-memory data store, can reduce database load by orders of magnitude when used correctly. But caching is not just about speed; it is about building systems that remain responsive under heavy load. A well-designed caching layer is the difference between a site that crashes during traffic spikes and one that handles them gracefully.',
        ),
        h2('Cache-Aside Pattern'),
        p(
          'The cache-aside pattern (also called lazy loading) is the most common caching strategy. The application checks the cache first. On a miss, it fetches from the database, stores the result in the cache, and returns it.',
        ),
        code(
          'typescript',
          `import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

async function getUser(userId: string): Promise<User> {
  const cacheKey = \`user:\${userId}\`

  // Check cache first
  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }

  // Cache miss: fetch from database
  const user = await db.users.findUnique({ where: { id: userId } })
  if (!user) throw new NotFoundError('User not found')

  // Store in cache with TTL
  await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600) // 1 hour TTL

  return user
}`,
          'cache.ts',
        ),
        h2('Cache Invalidation Strategies'),
        p(
          'Cache invalidation is famously one of the hardest problems in computer science. Here are the patterns that work in practice for most applications.',
        ),
        h3('Common Strategies'),
        ...ul([
          'TTL-based expiration: Set a time-to-live on every cached value. Simple and effective for data that can be slightly stale.',
          'Event-driven invalidation: Invalidate cache entries when the underlying data changes through application events or database triggers.',
          'Write-through: Update the cache immediately when writing to the database. Guarantees cache freshness but adds write latency.',
          'Cache tags: Group related cache entries with tags and invalidate them together when related data changes.',
        ]),
        code(
          'typescript',
          `// Event-driven invalidation
async function updateUser(userId: string, data: UpdateUserDto) {
  const user = await db.users.update({
    where: { id: userId },
    data,
  })

  // Invalidate all related caches
  const pipeline = redis.pipeline()
  pipeline.del(\`user:\${userId}\`)
  pipeline.del(\`user-profile:\${userId}\`)
  pipeline.del(\`user-posts:\${userId}\`)
  await pipeline.exec()

  return user
}`,
          'invalidation.ts',
        ),
        blockquote(
          'There are only two hard things in computer science: cache invalidation, naming things, and off-by-one errors.',
        ),
        p(
          'Monitor your cache hit rates closely. A hit rate below 80% suggests your TTLs are too short or your access patterns are not cache-friendly. Use Redis MONITOR in development to understand what queries hit the cache and which miss.',
        ),
      ],
    },

    {
      _id: '2024-27',
      title: 'Building GraphQL APIs with NestJS',
      slug: { current: 'building-graphql-apis-nestjs' },
      excerpt:
        'Learn to build type-safe GraphQL APIs with NestJS using the code-first approach, including resolvers, guards, dataloaders, and subscriptions.',
      publishedAt: '2024-05-30',
      author: 'John Pecson',
      categories: ['GraphQL', 'NestJS', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&h=400&fit=crop',
      body: [
        h2('GraphQL with NestJS: Code-First Approach'),
        p(
          'NestJS provides first-class support for GraphQL through the @nestjs/graphql package. The code-first approach lets you define your schema using TypeScript decorators, which means your types and schema are always in sync. No more manually maintaining separate .graphql files.',
        ),
        h2('Setting Up the Module'),
        code(
          'typescript',
          `import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      context: ({ req }) => ({ req }),
    }),
  ],
})
export class AppModule {}`,
          'app.module.ts',
        ),
        h2('Defining Types and Resolvers'),
        p(
          'Object types are defined as classes with decorators. Resolvers handle queries and mutations, automatically mapping to the generated schema. The integration with NestJS dependency injection means your resolvers stay clean and testable.',
        ),
        code(
          'typescript',
          `@ObjectType()
export class Post {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field({ nullable: true })
  content?: string

  @Field(() => User)
  author: User

  @Field()
  createdAt: Date
}

@Resolver(() => Post)
export class PostResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [Post])
  async posts(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return this.postsService.findAll({ limit })
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('input') input: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postsService.create(input, user.id)
  }

  @ResolveField(() => User)
  async author(@Parent() post: Post, @Loader(UserLoader) loader: DataLoader<string, User>) {
    return loader.load(post.authorId)
  }
}`,
          'post.resolver.ts',
        ),
        h3('Key GraphQL Patterns'),
        ...ul([
          'Use DataLoader to batch and cache database queries, solving the N+1 problem',
          'Implement cursor-based pagination for large datasets',
          'Use input types for mutations to validate and type-check arguments',
          'Add complexity analysis to prevent abusive deeply nested queries',
          'Use subscriptions for real-time data with WebSocket transport',
        ]),
        blockquote(
          'GraphQL is not a replacement for REST. It excels when clients have diverse data needs and you want to avoid over-fetching.',
        ),
      ],
    },

    // ─── JUNE ─────────────────────────────────────────────────────────
    {
      _id: '2024-12',
      title: 'DeFi Protocol Architecture Explained',
      slug: { current: 'defi-protocol-architecture' },
      excerpt:
        'Understand the architecture behind DeFi protocols including AMMs, lending platforms, and yield aggregators. Covers smart contract design and composability.',
      publishedAt: '2024-06-04',
      author: 'John Pecson',
      categories: ['DeFi', 'Blockchain', 'Architecture'],
      mainImage:
        'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop',
      body: [
        h2('The Building Blocks of DeFi'),
        p(
          'Decentralized Finance (DeFi) has created an entirely new financial system on the blockchain. At its core, DeFi protocols are compositions of smart contracts that replicate and extend traditional financial services. Understanding the architecture of these protocols is essential for any blockchain developer building in this space.',
        ),
        h2('Automated Market Makers (AMMs)'),
        p(
          'AMMs like Uniswap replaced traditional order books with liquidity pools and a constant product formula. Liquidity providers deposit token pairs into pools, and traders swap against these pools. The price is determined algorithmically, not by matching buy and sell orders.',
        ),
        code(
          'solidity',
          `// Simplified AMM constant product formula: x * y = k
contract SimpleAMM {
    uint256 public reserveA;
    uint256 public reserveB;

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure returns (uint256) {
        uint256 amountInWithFee = amountIn * 997; // 0.3% fee
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * 1000) + amountInWithFee;
        return numerator / denominator;
    }

    function swap(address tokenIn, uint256 amountIn) external {
        // Validate, transfer tokens, update reserves
        // The constant product k must be maintained or increased
    }
}`,
          'SimpleAMM.sol',
        ),
        h2('Lending Protocol Architecture'),
        p(
          'Lending protocols like Aave and Compound allow users to supply assets to earn interest and borrow assets against their collateral. The architecture involves interest rate models, collateral factors, and liquidation mechanisms.',
        ),
        h3('Core DeFi Components'),
        ...ul([
          'Liquidity Pools: Token reserves managed by smart contracts',
          'Price Oracles: Chainlink feeds providing real-world asset prices',
          'Governance: Token-based voting for protocol parameter changes',
          'Flash Loans: Uncollateralized loans that must be repaid in the same transaction',
          'Yield Strategies: Automated compounding and rebalancing across protocols',
        ]),
        h2('Composability: The DeFi Superpower'),
        p(
          'DeFi protocols are composable, meaning they can be stacked together like building blocks. A yield aggregator might deposit tokens into a lending protocol, use the interest-bearing receipt tokens as collateral in another protocol, and reinvest the yields. This composability creates exponential innovation but also systemic risk when protocols are deeply interconnected.',
        ),
        blockquote(
          'DeFi is money legos. Each protocol is a building block that others can build upon, creating financial products that were impossible in traditional finance.',
        ),
      ],
    },

    {
      _id: '2024-13',
      title: 'React Performance Optimization Techniques',
      slug: { current: 'react-performance-optimization' },
      excerpt:
        'Practical techniques to optimize React application performance including memoization, code splitting, virtualization, and profiling.',
      publishedAt: '2024-06-18',
      author: 'John Pecson',
      categories: ['React', 'Performance', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      body: [
        h2('Measuring Before Optimizing'),
        p(
          'The first rule of performance optimization is to measure before you optimize. React DevTools Profiler, Chrome Performance tab, and Lighthouse provide the data you need to identify actual bottlenecks. Premature optimization leads to complex code without measurable benefit. Always profile first.',
        ),
        h2('Preventing Unnecessary Re-renders'),
        p(
          'The most common performance issue in React applications is unnecessary re-renders. React.memo, useMemo, and useCallback are your primary tools, but they should be used strategically, not sprinkled everywhere.',
        ),
        code(
          'tsx',
          `// Memoize expensive computations
const ExpensiveList = React.memo(function ExpensiveList({
  items,
  filter,
}: {
  items: Item[]
  filter: string
}) {
  const filteredItems = useMemo(
    () => items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    ),
    [items, filter],
  )

  return (
    <ul>
      {filteredItems.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  )
})

// Stabilize callback references
function ParentComponent() {
  const [items, setItems] = useState<Item[]>([])

  const handleDelete = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  return <ExpensiveList items={items} onDelete={handleDelete} />
}`,
          'optimized-list.tsx',
        ),
        h2('Code Splitting and Lazy Loading'),
        p(
          'Code splitting breaks your bundle into smaller chunks that load on demand. React.lazy and dynamic imports work seamlessly with Next.js to defer loading of heavy components until they are needed.',
        ),
        code(
          'tsx',
          `import dynamic from 'next/dynamic'

// Heavy chart library loaded only when visible
const AnalyticsChart = dynamic(
  () => import('@/components/AnalyticsChart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false, // Client-only component
  },
)`,
          'lazy-loading.tsx',
        ),
        h3('Optimization Checklist'),
        ...ul([
          'Profile with React DevTools before optimizing',
          'Memoize components that receive complex props',
          'Virtualize long lists with react-window or @tanstack/virtual',
          'Code-split heavy components and routes',
          'Debounce rapid user inputs like search fields',
          'Use CSS containment for layout-heavy sections',
        ]),
        blockquote(
          'Performance optimization is not about making everything fast. It is about making the right things fast at the right time.',
        ),
      ],
    },

    // ─── JULY ─────────────────────────────────────────────────────────
    {
      _id: '2024-14',
      title: 'NestJS Microservices Architecture',
      slug: { current: 'nestjs-microservices-architecture' },
      excerpt:
        'Design and implement microservices with NestJS using various transport layers including TCP, Redis, RabbitMQ, and gRPC.',
      publishedAt: '2024-07-08',
      author: 'John Pecson',
      categories: ['NestJS', 'Microservices', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      body: [
        h2('From Monolith to Microservices'),
        p(
          'NestJS was designed with microservices in mind from the beginning. Its modular architecture maps naturally to service boundaries, and the built-in microservices package supports multiple transport layers. This post walks through building a microservices system where services communicate reliably and scale independently.',
        ),
        h2('Creating a Microservice'),
        p(
          'A NestJS microservice listens for messages over a transport layer instead of HTTP requests. The same decorators, dependency injection, and module system you use in HTTP applications work identically in microservices.',
        ),
        code(
          'typescript',
          `// orders-service/main.ts
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { OrdersModule } from './orders.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'orders_queue',
        queueOptions: { durable: true },
      },
    },
  )
  await app.listen()
}
bootstrap()`,
          'orders-service/main.ts',
        ),
        h2('Message Patterns'),
        p(
          'NestJS supports two communication styles: request-response for synchronous operations and event-based for fire-and-forget notifications. The controller decorators make it clear which pattern each handler uses.',
        ),
        code(
          'typescript',
          `@Controller()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // Request-response: caller waits for result
  @MessagePattern({ cmd: 'create_order' })
  async createOrder(@Payload() data: CreateOrderDto) {
    return this.ordersService.create(data)
  }

  // Event-based: fire and forget
  @EventPattern('payment_completed')
  async handlePaymentCompleted(@Payload() data: PaymentEvent) {
    await this.ordersService.markAsPaid(data.orderId)
  }
}`,
          'orders.controller.ts',
        ),
        h3('Transport Layer Options'),
        ...ul([
          'TCP: Simple point-to-point communication, good for development',
          'Redis: Pub/sub transport, lightweight and fast',
          'RabbitMQ: Full message broker with routing, queues, and dead-letter handling',
          'Kafka: High-throughput event streaming for analytics and data pipelines',
          'gRPC: Protocol Buffers-based transport with strong typing and bidirectional streaming',
        ]),
        blockquote(
          'Microservices solve organizational problems, not technical ones. Only split when your teams need to deploy independently.',
        ),
        h2('API Gateway Pattern'),
        p(
          'The API gateway acts as the single entry point for clients. It routes requests to the appropriate microservice, aggregates responses, and handles cross-cutting concerns like authentication and rate limiting. NestJS hybrid applications can serve both HTTP and microservice requests from the same process during the transition from monolith to microservices.',
        ),
      ],
    },

    {
      _id: '2024-15',
      title: 'DynamoDB Data Modeling Best Practices',
      slug: { current: 'dynamodb-data-modeling-best-practices' },
      excerpt:
        'Master DynamoDB data modeling with single-table design, GSI patterns, and access pattern-driven schema design for high-performance NoSQL applications.',
      publishedAt: '2024-07-23',
      author: 'John Pecson',
      categories: ['DynamoDB', 'AWS', 'Database'],
      mainImage:
        'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=800&h=400&fit=crop',
      body: [
        h2('Thinking Differently About Data'),
        p(
          'DynamoDB requires a fundamentally different approach to data modeling than relational databases. Instead of normalizing data and joining tables, you denormalize aggressively and design your schema around access patterns. Start by listing every query your application needs, then work backward to design keys and indexes that serve those queries efficiently.',
        ),
        h2('Single-Table Design'),
        p(
          'Single-table design stores multiple entity types in one table, using composite keys to organize data. This approach minimizes the number of requests needed to satisfy complex queries and simplifies infrastructure management.',
        ),
        code(
          'typescript',
          `// Entity key patterns in a single table
const keyPatterns = {
  user:         { PK: 'USER#userId',    SK: 'PROFILE' },
  userEmail:    { PK: 'EMAIL#email',    SK: 'USER' },       // For email lookups
  order:        { PK: 'USER#userId',    SK: 'ORDER#orderId' },
  orderItem:    { PK: 'ORDER#orderId',  SK: 'ITEM#itemId' },
}

// Fetch user profile: GetItem with PK=USER#123, SK=PROFILE
// Fetch user orders: Query with PK=USER#123, SK begins_with ORDER#
// Fetch order details: Query with PK=ORDER#456, SK begins_with ITEM#`,
          'key-design.ts',
        ),
        h2('Global Secondary Indexes'),
        p(
          'GSIs provide alternate access patterns without duplicating data. Design GSIs with the same care as your main table keys. Use sparse indexes to only include items that have the GSI key attributes, reducing costs and improving query performance.',
        ),
        code(
          'typescript',
          `import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}))

// Query orders by status using GSI
async function getOrdersByStatus(status: string, limit = 20) {
  const result = await ddb.send(new QueryCommand({
    TableName: 'MainTable',
    IndexName: 'GSI1',
    KeyConditionExpression: 'GSI1PK = :pk AND GSI1SK > :sk',
    ExpressionAttributeValues: {
      ':pk': \`STATUS#\${status}\`,
      ':sk': '2024-01-01',
    },
    ScanIndexForward: false, // Newest first
    Limit: limit,
  }))
  return result.Items
}`,
          'queries.ts',
        ),
        h3('Key Design Principles'),
        ...ol([
          'Start with access patterns, not entities',
          'Use composite sort keys for hierarchical data',
          'Overload GSIs to serve multiple access patterns',
          'Use sparse indexes to reduce costs',
          'Design for even partition key distribution',
          'Denormalize data to avoid the need for joins',
        ]),
        blockquote(
          'In DynamoDB, your schema is a direct reflection of your access patterns. If you cannot describe your queries upfront, you are not ready to design your table.',
        ),
      ],
    },

    // ─── AUGUST ────────────────────────────────────────────────────────
    {
      _id: '2024-16',
      title: 'Deploying Blockchain Nodes from Scratch',
      slug: { current: 'deploying-blockchain-nodes' },
      excerpt:
        'A comprehensive guide to deploying and operating Ethereum and EVM-compatible blockchain nodes for production infrastructure.',
      publishedAt: '2024-08-05',
      author: 'John Pecson',
      categories: ['Blockchain', 'DevOps', 'Infrastructure'],
      mainImage:
        'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=400&fit=crop',
      body: [
        h2('Why Run Your Own Node'),
        p(
          'Relying on third-party RPC providers like Infura or Alchemy works for development, but production applications handling significant traffic or sensitive data benefit from running their own nodes. Your own node gives you full control over rate limits, data privacy, and uptime. For DeFi applications and MEV strategies, low-latency access to the mempool requires a local node.',
        ),
        h2('Hardware Requirements'),
        p(
          'Ethereum full nodes require substantial resources. A Geth execution client paired with a Prysm consensus client needs at least 2TB of NVMe SSD storage, 16GB RAM, and a quad-core CPU. Archive nodes, which store every historical state, need 12TB or more of storage.',
        ),
        h3('Recommended Specifications'),
        ...ul([
          'CPU: 4+ cores, modern Intel or AMD',
          'RAM: 32GB for comfortable operation',
          'Storage: 2TB NVMe SSD (full node) or 12TB+ (archive node)',
          'Network: Stable 25+ Mbps with no bandwidth caps',
          'OS: Ubuntu 22.04 LTS or Debian 12',
        ]),
        h2('Setting Up Geth and Prysm'),
        code(
          'bash',
          `# Install Geth
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install -y geth

# Generate JWT secret for engine API authentication
openssl rand -hex 32 > /etc/ethereum/jwt.hex

# Start Geth execution client
geth \\
  --http \\
  --http.api eth,net,web3,txpool \\
  --http.addr 0.0.0.0 \\
  --authrpc.jwtsecret /etc/ethereum/jwt.hex \\
  --metrics \\
  --metrics.addr 0.0.0.0 \\
  --datadir /data/geth \\
  --cache 8192

# Start Prysm consensus client (separate terminal)
./prysm.sh beacon-chain \\
  --execution-endpoint=http://localhost:8551 \\
  --jwt-secret=/etc/ethereum/jwt.hex \\
  --suggested-fee-recipient=0xYourAddress \\
  --accept-terms-of-use`,
          'setup.sh',
        ),
        h2('Monitoring and Maintenance'),
        p(
          'A production node needs monitoring. Use Prometheus and Grafana to track sync status, peer count, block processing time, and disk usage. Set up alerts for when the node falls behind the chain head or when disk space runs low. Automated log rotation prevents disk exhaustion from Geth logs.',
        ),
        blockquote(
          'Running your own node is a commitment. But for production blockchain applications, the control and reliability it provides are worth the operational overhead.',
        ),
      ],
    },

    {
      _id: '2024-17',
      title: 'Next.js SSR vs SSG: Performance Comparison',
      slug: { current: 'nextjs-ssr-vs-ssg-performance' },
      excerpt:
        'A data-driven comparison of Server-Side Rendering and Static Site Generation in Next.js, with benchmarks and guidance on when to use each approach.',
      publishedAt: '2024-08-20',
      author: 'John Pecson',
      categories: ['Next.js', 'Performance', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop',
      body: [
        h2('The Rendering Spectrum'),
        p(
          'Next.js offers a spectrum of rendering strategies: Static Site Generation (SSG), Incremental Static Regeneration (ISR), Server-Side Rendering (SSR), and client-side rendering. Each has distinct performance characteristics, and the right choice depends on your data freshness requirements, traffic patterns, and content type.',
        ),
        h2('Static Site Generation (SSG)'),
        p(
          'SSG pre-renders pages at build time. The HTML is generated once and served from a CDN edge location. This gives the fastest possible Time to First Byte (TTFB) because there is no server computation on each request. SSG is ideal for content that changes infrequently.',
        ),
        code(
          'tsx',
          `// Static generation with the App Router
// This page is statically generated at build time
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug) // Fetched at build time
  return <Article post={post} />
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

// ISR: Revalidate every 60 seconds
export const revalidate = 60`,
          'blog/[slug]/page.tsx',
        ),
        h2('Server-Side Rendering (SSR)'),
        p(
          'SSR generates HTML on every request. This ensures the content is always fresh but adds server computation time to every page load. Use SSR when data changes frequently and users expect real-time accuracy, such as dashboards, search results, or personalized content.',
        ),
        h3('Performance Benchmarks'),
        p(
          'We tested a blog page with 50 paragraphs of content across rendering strategies on a typical Vercel deployment:',
        ),
        ...ul([
          'SSG: TTFB ~50ms, LCP ~800ms (served from CDN edge)',
          'ISR (60s): TTFB ~50ms for cached, ~200ms for regeneration',
          'SSR: TTFB ~150-300ms (depends on data fetching time)',
          'CSR: TTFB ~50ms (empty shell), LCP ~1200ms (content loads after JS)',
        ]),
        h2('Decision Framework'),
        ...ol([
          'Does the content change per request or per user? Use SSR.',
          'Does the content change every few minutes? Use ISR with appropriate revalidation.',
          'Does the content change only on deploy? Use SSG.',
          'Is the content behind authentication and highly personalized? Consider SSR with streaming.',
        ]),
        blockquote(
          'The best rendering strategy is often a mix. Use SSG for marketing pages, ISR for blog posts, and SSR for dashboards - all in the same Next.js application.',
        ),
      ],
    },

    {
      _id: '2024-28',
      title: 'Ethereum Gas Optimization Techniques',
      slug: { current: 'ethereum-gas-optimization' },
      excerpt:
        'Reduce smart contract gas costs with proven optimization techniques including storage patterns, calldata optimization, and assembly-level tricks.',
      publishedAt: '2024-08-30',
      author: 'John Pecson',
      categories: ['Ethereum', 'Solidity', 'Blockchain'],
      mainImage:
        'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
      body: [
        h2('Why Gas Optimization Matters'),
        p(
          'Every operation on Ethereum costs gas, and gas costs real money. For protocols processing thousands of transactions daily, even small gas savings per transaction add up to significant cost reductions. Gas optimization is not premature optimization in smart contracts; it is a core design requirement that directly impacts user adoption and protocol competitiveness.',
        ),
        h2('Storage Optimization'),
        p(
          'Storage is the most expensive operation on the EVM. A single SSTORE to a new slot costs 20,000 gas. Packing multiple values into a single storage slot, using mappings over arrays, and minimizing storage writes are the highest-impact optimizations.',
        ),
        code(
          'solidity',
          `// UNOPTIMIZED: Each variable uses a full 32-byte storage slot
contract Unoptimized {
    uint256 public amount;    // Slot 0
    bool public isActive;     // Slot 1 (wastes 31 bytes)
    address public owner;     // Slot 2 (wastes 12 bytes)
    uint256 public timestamp; // Slot 3
}

// OPTIMIZED: Pack variables into fewer slots
contract Optimized {
    uint128 public amount;    // Slot 0 (first 16 bytes)
    uint128 public timestamp; // Slot 0 (second 16 bytes)
    address public owner;     // Slot 1 (20 bytes)
    bool public isActive;     // Slot 1 (1 byte, packed with address)
}`,
          'StoragePacking.sol',
        ),
        h2('Calldata and Memory'),
        p(
          'Using calldata instead of memory for function parameters that are not modified saves gas because calldata is read-only and does not require copying. For external functions, always use calldata for array and struct parameters.',
        ),
        code(
          'solidity',
          `// EXPENSIVE: copies array to memory
function processItems(uint256[] memory items) external {
    for (uint256 i = 0; i < items.length; i++) {
        // process items[i]
    }
}

// CHEAPER: reads directly from calldata
function processItems(uint256[] calldata items) external {
    for (uint256 i = 0; i < items.length; i++) {
        // process items[i]
    }
}`,
          'CalldataVsMemory.sol',
        ),
        h3('Gas Optimization Checklist'),
        ...ul([
          'Pack struct and storage variables to minimize slot usage',
          'Use calldata instead of memory for read-only external parameters',
          'Cache storage values in local variables when accessed multiple times',
          'Use unchecked blocks for arithmetic that cannot overflow',
          'Prefer mappings over arrays for lookups',
          'Use custom errors instead of require strings (saves ~50 gas per error)',
          'Batch operations to amortize fixed transaction costs',
        ]),
        blockquote(
          'The cheapest gas is the gas you never spend. Design your contracts to minimize on-chain operations by moving computation off-chain where possible.',
        ),
      ],
    },

    // ─── SEPTEMBER ────────────────────────────────────────────────────
    {
      _id: '2024-18',
      title: 'JWT Authentication and Authorization Patterns',
      slug: { current: 'jwt-authentication-authorization-patterns' },
      excerpt:
        'Implement secure JWT-based authentication with refresh token rotation, role-based access control, and common security pitfalls to avoid.',
      publishedAt: '2024-09-09',
      author: 'John Pecson',
      categories: ['Security', 'Node.js', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop',
      body: [
        h2('JWT Authentication Done Right'),
        p(
          'JSON Web Tokens are the most popular authentication mechanism for APIs and single-page applications. However, JWTs are frequently implemented insecurely. This guide covers the patterns that make JWT authentication robust, including token lifecycle management, refresh token rotation, and proper secret handling.',
        ),
        h2('Token Structure and Signing'),
        p(
          'A JWT consists of three parts: header, payload, and signature. The signature is created using a secret key (HMAC) or a public/private key pair (RSA/ECDSA). Always use asymmetric signing (RS256) for production systems where multiple services need to verify tokens.',
        ),
        code(
          'typescript',
          `import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'

interface TokenPayload {
  sub: string       // User ID
  email: string
  roles: string[]
  iat: number
  exp: number
}

function generateTokenPair(user: User) {
  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, roles: user.roles },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: '15m', algorithm: 'RS256' },
  )

  const refreshToken = randomBytes(40).toString('hex')

  // Store refresh token hash in database with user association
  // Never store the raw refresh token
  return { accessToken, refreshToken }
}`,
          'auth.ts',
        ),
        h2('Refresh Token Rotation'),
        p(
          'Refresh token rotation issues a new refresh token with every access token refresh. The old refresh token is invalidated immediately. If a stolen refresh token is used, the rotation chain breaks, and all tokens for that user are revoked. This limits the damage window of a compromised token.',
        ),
        code(
          'typescript',
          `async function refreshAccessToken(refreshToken: string) {
  const storedToken = await db.refreshTokens.findUnique({
    where: { tokenHash: hashToken(refreshToken) },
  })

  if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
    // Token reuse detected or expired - revoke all user tokens
    if (storedToken?.revoked) {
      await db.refreshTokens.updateMany({
        where: { userId: storedToken.userId },
        data: { revoked: true },
      })
    }
    throw new UnauthorizedError('Invalid refresh token')
  }

  // Revoke current token and issue new pair
  await db.refreshTokens.update({
    where: { id: storedToken.id },
    data: { revoked: true },
  })

  const user = await db.users.findUnique({ where: { id: storedToken.userId } })
  return generateTokenPair(user!)
}`,
          'refresh.ts',
        ),
        h3('Security Best Practices'),
        ...ul([
          'Use short-lived access tokens (15 minutes) with refresh token rotation',
          'Store refresh tokens as hashes in the database, never as plain text',
          'Implement token revocation for logout and security events',
          'Use httpOnly, secure, sameSite cookies for web applications',
          'Never store JWTs in localStorage; prefer httpOnly cookies',
          'Validate all claims including issuer, audience, and expiration',
        ]),
        blockquote(
          'Authentication is not a feature to implement once and forget. It requires ongoing vigilance and regular security reviews.',
        ),
      ],
    },

    {
      _id: '2024-19',
      title: 'Event-Driven Architecture with Node.js',
      slug: { current: 'event-driven-architecture-nodejs' },
      excerpt:
        'Design event-driven systems with Node.js using message brokers, event sourcing, and CQRS patterns for scalable, decoupled applications.',
      publishedAt: '2024-09-24',
      author: 'John Pecson',
      categories: ['Architecture', 'Node.js', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop',
      body: [
        h2('Why Event-Driven Architecture'),
        p(
          'Event-driven architecture (EDA) decouples producers from consumers. Instead of calling other services directly, a service emits an event, and any interested service reacts to it. This decoupling enables independent scaling, resilient systems, and easier addition of new functionality without modifying existing services.',
        ),
        h2('Event Bus with RabbitMQ'),
        p(
          'RabbitMQ provides reliable message delivery with exchanges, queues, and acknowledgments. The topic exchange pattern allows services to subscribe to specific event types using routing patterns.',
        ),
        code(
          'typescript',
          `import amqp from 'amqplib'

class EventBus {
  private connection: amqp.Connection
  private channel: amqp.Channel

  async connect(url: string) {
    this.connection = await amqp.connect(url)
    this.channel = await this.connection.createChannel()
    await this.channel.assertExchange('events', 'topic', { durable: true })
  }

  async publish(eventType: string, data: unknown) {
    const message = {
      eventType,
      data,
      timestamp: new Date().toISOString(),
      correlationId: crypto.randomUUID(),
    }
    this.channel.publish(
      'events',
      eventType,
      Buffer.from(JSON.stringify(message)),
      { persistent: true },
    )
  }

  async subscribe(pattern: string, handler: (event: any) => Promise<void>) {
    const queue = await this.channel.assertQueue('', { exclusive: true })
    await this.channel.bindQueue(queue.queue, 'events', pattern)

    this.channel.consume(queue.queue, async (msg) => {
      if (!msg) return
      try {
        const event = JSON.parse(msg.content.toString())
        await handler(event)
        this.channel.ack(msg)
      } catch (error) {
        this.channel.nack(msg, false, true) // Requeue on failure
      }
    })
  }
}`,
          'event-bus.ts',
        ),
        h2('Event Sourcing Basics'),
        p(
          'Event sourcing stores the sequence of events that led to the current state, rather than just the current state. To reconstruct an entity, you replay its events from the beginning. This provides a complete audit trail and enables powerful patterns like temporal queries and event replay for debugging.',
        ),
        h3('EDA Patterns'),
        ...ul([
          'Pub/Sub: Decouple producers from consumers through message topics',
          'Event Sourcing: Store events as the source of truth, derive state from events',
          'CQRS: Separate read and write models for independent optimization',
          'Saga: Coordinate multi-step business processes across services',
          'Dead Letter Queue: Handle failed messages without blocking processing',
        ]),
        blockquote(
          'Events are facts about things that happened. They are immutable, ordered, and form the foundation of reliable distributed systems.',
        ),
        p(
          'Start simple. Introduce events where you need decoupling, not everywhere. A well-placed event bus between two services is more valuable than a fully event-sourced system that nobody on the team understands.',
        ),
      ],
    },

    // ─── OCTOBER ──────────────────────────────────────────────────────
    {
      _id: '2024-20',
      title: 'Solidity Development Best Practices',
      slug: { current: 'solidity-development-best-practices' },
      excerpt:
        'Essential best practices for Solidity development covering code organization, testing strategies, gas efficiency, and upgrade patterns.',
      publishedAt: '2024-10-07',
      author: 'John Pecson',
      categories: ['Solidity', 'Blockchain', 'Smart Contracts'],
      mainImage:
        'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop',
      body: [
        h2('Writing Production-Grade Solidity'),
        p(
          'Solidity development demands a higher standard of code quality than most programming environments. Smart contracts are immutable once deployed, handle real money, and every operation costs gas. These constraints shape every best practice in this guide. Following these patterns is not optional for production contracts; it is a baseline for professional development.',
        ),
        h2('Project Structure and Organization'),
        p(
          'A well-organized Solidity project uses a clear directory structure, consistent naming conventions, and NatSpec documentation for every public function.',
        ),
        code(
          'solidity',
          `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title Staking Pool
/// @author John Pecson
/// @notice Allows users to stake ERC20 tokens and earn rewards
/// @dev Implements a time-weighted reward distribution model
contract StakingPool is ReentrancyGuard {
    /// @notice The token being staked
    IERC20 public immutable stakingToken;

    /// @notice Total staked amount across all users
    uint256 public totalStaked;

    /// @notice Mapping of user addresses to their staked amounts
    mapping(address => uint256) public stakedBalance;

    /// @notice Emitted when tokens are staked
    event Staked(address indexed user, uint256 amount);

    /// @notice Emitted when tokens are withdrawn
    event Withdrawn(address indexed user, uint256 amount);

    error InsufficientBalance(uint256 requested, uint256 available);
    error ZeroAmount();

    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
    }

    /// @notice Stake tokens into the pool
    /// @param amount The amount of tokens to stake
    function stake(uint256 amount) external nonReentrant {
        if (amount == 0) revert ZeroAmount();
        stakedBalance[msg.sender] += amount;
        totalStaked += amount;
        stakingToken.transferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }
}`,
          'StakingPool.sol',
        ),
        h3('Code Quality Checklist'),
        ...ul([
          'Use custom errors instead of require strings for gas efficiency',
          'Add NatSpec comments for all public and external functions',
          'Use immutable and constant for values set once',
          'Emit events for all state changes',
          'Follow the Checks-Effects-Interactions pattern',
          'Use OpenZeppelin contracts for standard functionality',
          'Pin Solidity compiler version to a specific minor release',
        ]),
        h2('Testing Strategies'),
        p(
          'Smart contract testing should cover unit tests for individual functions, integration tests for contract interactions, and fuzz tests for edge cases. Use Foundry or Hardhat with Chai assertions. Aim for 100% branch coverage on any contract handling funds.',
        ),
        code(
          'typescript',
          `describe('StakingPool', () => {
  it('should allow staking and update balances', async () => {
    const amount = ethers.parseEther('100')
    await token.approve(pool.address, amount)
    await pool.stake(amount)

    expect(await pool.stakedBalance(owner.address)).to.equal(amount)
    expect(await pool.totalStaked()).to.equal(amount)
    expect(await token.balanceOf(pool.address)).to.equal(amount)
  })

  it('should revert on zero amount', async () => {
    await expect(pool.stake(0))
      .to.be.revertedWithCustomError(pool, 'ZeroAmount')
  })
})`,
          'StakingPool.test.ts',
        ),
        blockquote(
          'In smart contract development, there is no "move fast and break things." Every line of code must be deliberate and thoroughly tested.',
        ),
      ],
    },

    {
      _id: '2024-21',
      title: 'PostgreSQL Query Optimization and Indexing',
      slug: { current: 'postgresql-query-optimization-indexing' },
      excerpt:
        'Optimize PostgreSQL performance with proper indexing strategies, query analysis with EXPLAIN, and patterns for handling millions of rows.',
      publishedAt: '2024-10-22',
      author: 'John Pecson',
      categories: ['PostgreSQL', 'Database', 'Performance'],
      mainImage:
        'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=400&fit=crop',
      body: [
        h2('When Queries Get Slow'),
        p(
          'PostgreSQL is remarkably fast out of the box, but as your data grows from thousands to millions of rows, query performance becomes a critical concern. The difference between a 5ms query and a 5-second query is often a single missing index or a suboptimal join. This guide covers the tools and techniques for identifying and fixing slow queries.',
        ),
        h2('Understanding EXPLAIN ANALYZE'),
        p(
          'EXPLAIN ANALYZE is your most important tool. It shows the query planner execution plan with actual timing data, revealing exactly where time is spent. Always use ANALYZE to get actual execution times, not just estimates.',
        ),
        code(
          'sql',
          `-- Run EXPLAIN ANALYZE to see the actual execution plan
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count, SUM(o.total) as total_spent
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.created_at >= '2024-01-01'
  AND o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY total_spent DESC
LIMIT 20;

-- Look for:
-- Seq Scan (full table scan - usually needs an index)
-- Nested Loop with high row counts
-- Sort operations on large datasets
-- High actual vs estimated row counts (stale statistics)`,
          'explain.sql',
        ),
        h2('Indexing Strategies'),
        p(
          'Indexes dramatically speed up reads but slow down writes and consume storage. The key is creating the right indexes for your specific query patterns. A composite index on (status, created_at) serves different queries than separate indexes on each column.',
        ),
        code(
          'sql',
          `-- Composite index for the query above
CREATE INDEX idx_orders_status_created_at
  ON orders (status, created_at DESC)
  WHERE status = 'completed';  -- Partial index: only indexes completed orders

-- Covering index: includes all needed columns to avoid table lookups
CREATE INDEX idx_orders_covering
  ON orders (user_id, status, created_at)
  INCLUDE (total);

-- GIN index for JSONB queries
CREATE INDEX idx_users_metadata
  ON users USING GIN (metadata jsonb_path_ops);

-- Expression index for case-insensitive search
CREATE INDEX idx_users_email_lower
  ON users (LOWER(email));`,
          'indexes.sql',
        ),
        h3('Optimization Patterns'),
        ...ul([
          'Use partial indexes to only index rows that match common query predicates',
          'Create covering indexes with INCLUDE to avoid table lookups',
          'Use connection pooling (PgBouncer) to handle many concurrent clients',
          'Partition large tables by date range for time-series data',
          'Run VACUUM ANALYZE regularly to keep statistics current',
          'Use pg_stat_statements to identify the slowest and most frequent queries',
        ]),
        blockquote(
          'The best index is the one that eliminates the most rows the earliest. Think about selectivity, not just column coverage.',
        ),
        p(
          'Monitor your database continuously. Set up alerts for slow queries (log_min_duration_statement), monitor cache hit ratios, and review pg_stat_statements weekly to catch regressions early.',
        ),
      ],
    },

    {
      _id: '2024-29',
      title: 'Serverless Architecture with AWS Lambda',
      slug: { current: 'serverless-architecture-aws-lambda' },
      excerpt:
        'Design serverless applications with AWS Lambda including API Gateway integration, cold start optimization, and best practices for production workloads.',
      publishedAt: '2024-10-30',
      author: 'John Pecson',
      categories: ['AWS', 'Serverless', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1607799279861-4dd421887fc9?w=800&h=400&fit=crop',
      body: [
        h2('The Serverless Paradigm'),
        p(
          'AWS Lambda changed how we think about infrastructure. Instead of provisioning servers, you deploy functions that execute in response to events. You pay only for the compute time consumed, scaling automatically from zero to thousands of concurrent executions. For event-driven workloads and APIs with variable traffic, serverless can reduce costs by 80% or more compared to always-on servers.',
        ),
        h2('Lambda Function Design'),
        p(
          'Well-designed Lambda functions are small, focused, and stateless. They handle a single responsibility and complete quickly. Keep your handler thin and delegate business logic to separate modules for testability.',
        ),
        code(
          'typescript',
          `import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'

// Initialize outside handler for connection reuse
const client = DynamoDBDocumentClient.from(new DynamoDBClient({}))

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const userId = event.pathParameters?.id
    if (!userId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing user ID' }) }
    }

    const result = await client.send(new GetCommand({
      TableName: process.env.USERS_TABLE!,
      Key: { PK: \`USER#\${userId}\`, SK: 'PROFILE' },
    }))

    if (!result.Item) {
      return { statusCode: 404, body: JSON.stringify({ error: 'User not found' }) }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.Item),
    }
  } catch (error) {
    console.error('Error:', error)
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) }
  }
}`,
          'getUser.ts',
        ),
        h2('Cold Start Optimization'),
        p(
          'Cold starts occur when Lambda creates a new execution environment. For Node.js functions, cold starts typically add 200-500ms. Minimize them by keeping deployment packages small, using lazy imports for rarely-used dependencies, and enabling provisioned concurrency for latency-sensitive endpoints.',
        ),
        h3('Serverless Best Practices'),
        ...ul([
          'Initialize SDK clients outside the handler for connection reuse',
          'Use environment variables for configuration, not hardcoded values',
          'Set appropriate memory sizes (more memory = more CPU = faster execution)',
          'Keep deployment packages under 5MB for fastest cold starts',
          'Use Lambda layers for shared dependencies across functions',
          'Implement structured logging with correlation IDs for tracing',
          'Set DLQs on asynchronous invocations to capture failed events',
        ]),
        blockquote(
          'Serverless is not about having no servers. It is about not thinking about servers so you can focus entirely on business logic.',
        ),
      ],
    },

    // ─── NOVEMBER ─────────────────────────────────────────────────────
    {
      _id: '2024-22',
      title: 'React Server Components in Production',
      slug: { current: 'react-server-components-production' },
      excerpt:
        'Lessons learned from running React Server Components in production, including migration strategies, performance wins, and common pitfalls.',
      publishedAt: '2024-11-04',
      author: 'John Pecson',
      categories: ['React', 'Next.js', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
      body: [
        h2('From Theory to Production'),
        p(
          'After months of running React Server Components in production across multiple applications, we have accumulated practical insights that go beyond documentation examples. RSC delivers on its performance promises, but the migration path and mental model shifts require deliberate effort. This post shares what we learned.',
        ),
        h2('Migration Strategy'),
        p(
          'We migrated incrementally, starting with leaf components and working inward. The key insight is that you do not need to convert your entire application at once. Start with data-fetching components that have no interactivity, convert them to server components, and measure the impact.',
        ),
        h3('Migration Priority Order'),
        ...ol([
          'Static layout components (headers, footers, sidebars)',
          'Data-fetching list and detail pages',
          'Content rendering components (blog posts, documentation)',
          'Form containers (keep form inputs as client components)',
          'Complex interactive features (last, as these often need client components)',
        ]),
        h2('Performance Wins'),
        p(
          'The numbers speak for themselves. Our e-commerce product listing page dropped from 180KB of JavaScript to 42KB after converting to server components. Time to Interactive improved by 40%. The improvement is most dramatic for content-heavy pages with minimal interactivity.',
        ),
        code(
          'tsx',
          `// Before: Client component fetching data
'use client'
import { useEffect, useState } from 'react'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts).finally(() => setLoading(false))
  }, [])

  if (loading) return <Skeleton />
  return products.map(p => <ProductCard key={p.id} product={p} />)
}

// After: Server component with direct data access
import { db } from '@/lib/db'

async function ProductList() {
  const products = await db.products.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
  return products.map(p => <ProductCard key={p.id} product={p} />)
}`,
          'migration-example.tsx',
        ),
        h2('Common Pitfalls'),
        ...ul([
          'Accidentally adding "use client" to components that do not need it',
          'Trying to use useState or useEffect in server components (they only work in client components)',
          'Not understanding the serialization boundary between server and client',
          'Over-fetching data in server components because there is no visible loading state',
          'Forgetting that server components cannot pass functions as props to client components',
        ]),
        blockquote(
          'Server Components are not a silver bullet. They are a powerful tool that, when applied to the right problems, delivers significant performance improvements.',
        ),
      ],
    },

    {
      _id: '2024-23',
      title: 'AWS Infrastructure as Code with CDK',
      slug: { current: 'aws-infrastructure-code-cdk' },
      excerpt:
        'Build and manage AWS infrastructure using the Cloud Development Kit (CDK) with TypeScript, including VPCs, ECS clusters, and CI/CD pipelines.',
      publishedAt: '2024-11-19',
      author: 'John Pecson',
      categories: ['AWS', 'CDK', 'DevOps'],
      mainImage:
        'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&h=400&fit=crop',
      body: [
        h2('Infrastructure as Real Code'),
        p(
          'AWS CDK lets you define cloud infrastructure using TypeScript, Python, or other programming languages instead of YAML or JSON templates. This means you get real programming constructs like loops, conditionals, composition, and type safety. CDK synthesizes your code into CloudFormation templates, giving you the reliability of CloudFormation with the expressiveness of a programming language.',
        ),
        h2('Defining a VPC and ECS Cluster'),
        code(
          'typescript',
          `import * as cdk from 'aws-cdk-lib'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns'
import { Construct } from 'constructs'

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const vpc = new ec2.Vpc(this, 'ApiVpc', {
      maxAzs: 2,
      natGateways: 1,
    })

    const cluster = new ecs.Cluster(this, 'ApiCluster', { vpc })

    const service = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this, 'ApiService', {
        cluster,
        cpu: 512,
        memoryLimitMiB: 1024,
        desiredCount: 2,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset('./api'),
          containerPort: 3000,
          environment: {
            NODE_ENV: 'production',
            DATABASE_URL: databaseUrl.stringValue,
          },
        },
        publicLoadBalancer: true,
      },
    )

    service.targetGroup.configureHealthCheck({
      path: '/health',
      healthyThresholdCount: 2,
    })
  }
}`,
          'api-stack.ts',
        ),
        h2('Stack Composition'),
        p(
          'CDK encourages composing infrastructure from reusable constructs. Instead of one massive template, you build small, focused stacks that reference each other. A networking stack provides the VPC, a database stack creates RDS instances, and a service stack deploys your application.',
        ),
        h3('CDK Advantages Over CloudFormation'),
        ...ul([
          'Type safety catches infrastructure misconfigurations at compile time',
          'Loops and conditionals reduce repetition in multi-environment setups',
          'Custom constructs enable sharing infrastructure patterns across teams',
          'Unit testing with assertions verifies infrastructure before deployment',
          'IDE autocomplete and documentation for every AWS resource property',
        ]),
        code(
          'typescript',
          `// Unit test for CDK stack
import { Template } from 'aws-cdk-lib/assertions'

test('creates Fargate service with correct configuration', () => {
  const app = new cdk.App()
  const stack = new ApiStack(app, 'TestStack')
  const template = Template.fromStack(stack)

  template.hasResourceProperties('AWS::ECS::Service', {
    DesiredCount: 2,
    LaunchType: 'FARGATE',
  })

  template.hasResourceProperties('AWS::ElasticLoadBalancingV2::TargetGroup', {
    HealthCheckPath: '/health',
  })
})`,
          'api-stack.test.ts',
        ),
        blockquote(
          'CDK turns infrastructure from a configuration problem into a software engineering problem. And software engineers already know how to solve software problems.',
        ),
      ],
    },

    // ─── DECEMBER ─────────────────────────────────────────────────────
    {
      _id: '2024-24',
      title: 'Full-Stack Testing Strategies',
      slug: { current: 'full-stack-testing-strategies' },
      excerpt:
        'A comprehensive guide to testing modern full-stack applications, covering unit tests, integration tests, E2E tests, and the testing trophy approach.',
      publishedAt: '2024-12-02',
      author: 'John Pecson',
      categories: ['Testing', 'Full-Stack', 'Quality'],
      mainImage:
        'https://images.unsplash.com/photo-1576444356170-66073FB20e6c?w=800&h=400&fit=crop',
      body: [
        h2('The Testing Trophy'),
        p(
          'Kent C. Dodds introduced the testing trophy as an alternative to the testing pyramid. It emphasizes integration tests over unit tests, arguing that integration tests provide the best balance of confidence and maintenance cost. The trophy shape suggests more integration tests, fewer unit tests, and even fewer E2E tests.',
        ),
        p(
          'For full-stack applications, this means testing your API endpoints with a real database, testing React components with real user interactions, and reserving E2E tests for critical user flows.',
        ),
        h2('Backend Integration Tests'),
        p(
          'Test your API endpoints against a real database (or a test container) with realistic data. This catches bugs that unit tests miss, like incorrect SQL queries, missing database constraints, and serialization issues.',
        ),
        code(
          'typescript',
          `import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('Users API (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(() => app.close())

  it('POST /users creates a user and returns 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({ email: 'test@example.com', name: 'Test User' })
      .expect(201)

    expect(response.body).toMatchObject({
      email: 'test@example.com',
      name: 'Test User',
    })
    expect(response.body.id).toBeDefined()
  })

  it('GET /users/:id returns 404 for non-existent user', async () => {
    await request(app.getHttpServer())
      .get('/users/non-existent-id')
      .expect(404)
  })
})`,
          'users.e2e-spec.ts',
        ),
        h2('Frontend Component Tests'),
        p(
          'Testing Library encourages testing components the way users interact with them. Instead of testing implementation details, test what the user sees and does. Query by role, text, and label, not by CSS class or component internals.',
        ),
        code(
          'tsx',
          `import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

test('shows validation error for invalid email', async () => {
  const user = userEvent.setup()
  render(<LoginForm onSubmit={jest.fn()} />)

  await user.type(screen.getByLabelText(/email/i), 'invalid-email')
  await user.click(screen.getByRole('button', { name: /sign in/i }))

  expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
})`,
          'LoginForm.test.tsx',
        ),
        h3('Testing Strategy by Layer'),
        ...ul([
          'Unit tests: Pure functions, utilities, business logic calculations',
          'Integration tests: API endpoints, database queries, component interactions',
          'E2E tests: Critical user flows (signup, checkout, payment)',
          'Visual regression: Screenshot comparisons for UI consistency',
          'Performance tests: Load testing for API endpoints under stress',
        ]),
        blockquote(
          'Write tests that give you confidence to deploy on Friday afternoon. If your tests do not give you that confidence, you need different tests.',
        ),
      ],
    },

    {
      _id: '2024-25',
      title: '2024 Web Development Year in Review',
      slug: { current: '2024-web-development-year-review' },
      excerpt:
        'A comprehensive look back at the most significant web development trends, tools, and shifts of 2024, and what they mean for the future.',
      publishedAt: '2024-12-18',
      author: 'John Pecson',
      categories: ['Web Development', 'Review', 'Trends'],
      mainImage:
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop',
      body: [
        h2('A Year of Maturation'),
        p(
          '2024 was the year the web development ecosystem matured. Rather than introducing entirely new paradigms, the industry focused on stabilizing and refining the innovations of previous years. React Server Components moved from experimental to production-ready. TypeScript adoption crossed the tipping point. AI-assisted development went from novelty to everyday tool.',
        ),
        h2('The Rise of the AI-Assisted Developer'),
        p(
          'AI code assistants became a standard part of the developer toolkit in 2024. GitHub Copilot, Cursor, and Claude Code transformed how developers write code. The impact is not about replacing developers but about amplifying their productivity. Boilerplate generation, test writing, and documentation became faster, freeing developers to focus on architecture and design decisions.',
        ),
        h2('Framework Landscape'),
        p(
          'Next.js 14 solidified the App Router and Server Components. Remix joined Shopify and focused on e-commerce patterns. Astro continued to gain traction for content-focused sites. The meta-framework approach, where frameworks handle routing, data fetching, and deployment, became the default rather than the exception.',
        ),
        h3('Key Trends of 2024'),
        ...ul([
          'React Server Components reached production maturity in Next.js 14',
          'TypeScript became the default for new projects, not an optional add-on',
          'AI-assisted development integrated deeply into developer workflows',
          'Edge computing with Cloudflare Workers and Vercel Edge Functions grew rapidly',
          'Web3 focused on UX improvements and account abstraction',
          'Rust-based tooling (Turbopack, SWC, Biome) replaced JavaScript tools for performance',
          'Monorepo tooling with Turborepo and Nx became standard for teams',
        ]),
        h2('Looking Ahead to 2025'),
        p(
          'The trends point toward even deeper AI integration in development workflows, continued convergence of server and client rendering, and growing adoption of edge-first architectures. The developers who thrive will be those who use these tools to solve real problems, not those who chase every new framework.',
        ),
        blockquote(
          'The best technology choices are boring technology choices. 2024 proved that maturity and reliability matter more than novelty.',
        ),
      ],
    },

    {
      _id: '2024-30',
      title: 'Secure Coding Practices for Web Applications',
      slug: { current: 'secure-coding-practices-web-applications' },
      excerpt:
        'Essential security practices every web developer must know, covering XSS prevention, CSRF protection, SQL injection, and secure headers.',
      publishedAt: '2024-12-28',
      author: 'John Pecson',
      categories: ['Security', 'Web Development', 'Best Practices'],
      mainImage:
        'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&h=400&fit=crop',
      body: [
        h2('Security Is Everyone\'s Responsibility'),
        p(
          'Web application security is not just a concern for security teams. Every developer writing code that handles user input, stores data, or communicates over the network must understand and apply secure coding practices. The OWASP Top 10 is the baseline, but truly secure applications go far beyond checking boxes on a list.',
        ),
        h2('Cross-Site Scripting (XSS) Prevention'),
        p(
          'XSS occurs when untrusted data is included in a web page without proper sanitization. Modern frameworks like React escape output by default, but dangerouslySetInnerHTML and server-side rendering contexts still require vigilance.',
        ),
        code(
          'typescript',
          `// DANGEROUS: Never use dangerouslySetInnerHTML with user input
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// SAFE: React escapes by default
<div>{userInput}</div>

// For cases where HTML rendering is needed, use a sanitizer
import DOMPurify from 'dompurify'

function SafeHTML({ content }: { content: string }) {
  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href', 'target'],
  })
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}`,
          'xss-prevention.tsx',
        ),
        h2('SQL Injection'),
        p(
          'SQL injection remains one of the most dangerous vulnerabilities. Always use parameterized queries or ORM methods. Never concatenate user input into SQL strings.',
        ),
        code(
          'typescript',
          `// VULNERABLE: String concatenation
const query = \`SELECT * FROM users WHERE email = '\${email}'\`

// SAFE: Parameterized query
const result = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email],
)

// SAFE: ORM (Prisma)
const user = await prisma.user.findUnique({
  where: { email },
})`,
          'sql-injection.ts',
        ),
        h2('Security Headers'),
        p(
          'HTTP security headers provide an additional layer of defense. Configure them at the server or CDN level to protect against common attacks.',
        ),
        code(
          'typescript',
          `// next.config.mjs security headers
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]`,
          'security-headers.ts',
        ),
        h3('Security Checklist'),
        ...ul([
          'Sanitize and validate all user input on the server side',
          'Use parameterized queries or ORMs for all database access',
          'Implement CSRF tokens for state-changing operations',
          'Set security headers (CSP, HSTS, X-Frame-Options)',
          'Use HTTPS everywhere with proper TLS configuration',
          'Hash passwords with bcrypt or Argon2, never store plaintext',
          'Implement rate limiting on authentication endpoints',
          'Log security events for monitoring and incident response',
        ]),
        blockquote(
          'Security vulnerabilities are not just technical problems. They are trust problems. Every breach erodes the trust your users place in your application.',
        ),
      ],
    },
  ]
}
