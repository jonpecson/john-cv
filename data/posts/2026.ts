import { BlogPost } from '@/types/blog'
import { h2, h3, p, code, ul, ol, blockquote } from '@/lib/portable-text-helpers'

export function getPosts2026(): BlogPost[] {
  return [
    {
      _id: '2026-01',
      title: 'AI-Assisted Development Workflows in 2026',
      slug: { current: 'ai-assisted-development-workflows-2026' },
      excerpt: 'How AI tools like GitHub Copilot, Claude, and ChatGPT are transforming the way we write, review, and ship code in 2026.',
      publishedAt: '2026-01-10T10:00:00Z',
      author: 'John Pecson',
      categories: ['AI', 'Developer Tools', 'Productivity'],
      mainImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      body: [
        h2('The AI-Augmented Developer'),
        p('The role of a software engineer has fundamentally shifted. In 2026, AI is not replacing developers—it is amplifying them. From code generation to automated testing, AI tools have become essential parts of the modern development workflow. Having integrated these tools into my daily work at Empire Crypto Trading, I want to share practical patterns that actually deliver results.'),
        h3('Code Generation and Pair Programming'),
        p('AI-powered code generation has matured significantly. Tools like GitHub Copilot and Claude now understand project context, coding conventions, and architectural patterns. The key is treating AI as a junior pair programmer—it generates suggestions, but you make the architectural decisions.'),
        code('typescript', `// AI can generate boilerplate, but you define the architecture
// Example: Generating a NestJS service with AI assistance

@Injectable()
export class TradingService {
  constructor(
    @InjectRepository(Trade)
    private tradeRepo: Repository<Trade>,
    private readonly wsGateway: WebSocketGateway,
    private readonly cacheService: CacheService,
  ) {}

  async executeTrade(dto: ExecuteTradeDto): Promise<Trade> {
    // AI generates the implementation
    // You review for security, edge cases, and business logic
    const trade = this.tradeRepo.create(dto);
    await this.tradeRepo.save(trade);
    this.wsGateway.broadcastTrade(trade);
    await this.cacheService.invalidate(\`portfolio:\${dto.userId}\`);
    return trade;
  }
}`, 'trading.service.ts'),
        h3('AI-Powered Code Review'),
        p('Automated code review has become a game-changer. AI tools can catch security vulnerabilities, performance issues, and code smell before human reviewers even see the PR. We run AI review as a CI step that flags potential issues with explanations.'),
        ul([
          'Security scanning: AI identifies SQL injection, XSS, and authentication bypass patterns',
          'Performance analysis: Detects N+1 queries, unnecessary re-renders, and memory leaks',
          'Convention enforcement: Ensures code follows project patterns without manual nitpicking',
          'Documentation generation: Auto-generates JSDoc and README updates from code changes',
        ]),
        h3('Testing with AI'),
        p('One of the most productive uses of AI in development is test generation. AI can analyze your code and generate comprehensive test cases, including edge cases you might miss. The workflow is: write the implementation, let AI generate test scaffolding, then refine the tests to match your exact requirements.'),
        blockquote('The best AI workflow is not about replacing human judgment—it is about eliminating toil so you can focus on architecture, security, and user experience.'),
        h3('Practical Tips for AI-Augmented Development'),
        ol([
          'Always review AI-generated code for security implications before merging',
          'Use AI for boilerplate and repetitive patterns, not for core business logic',
          'Train your AI tools on your codebase conventions using project-level configuration',
          'Combine AI code review with human review—they catch different types of issues',
          'Use AI to generate documentation, but verify accuracy against the actual implementation',
        ]),
      ],
    },
    {
      _id: '2026-02',
      title: 'Modern Authentication Patterns for 2026',
      slug: { current: 'modern-authentication-patterns-2026' },
      excerpt: 'A comprehensive guide to authentication in 2026: passkeys, OAuth 2.1, session tokens, and zero-trust architecture for modern web applications.',
      publishedAt: '2026-01-24T10:00:00Z',
      author: 'John Pecson',
      categories: ['Security', 'Authentication', 'Backend'],
      mainImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop',
      body: [
        h2('Authentication in 2026: Beyond Passwords'),
        p('Authentication has evolved dramatically. Passkeys are replacing passwords, OAuth 2.1 has simplified the authorization landscape, and zero-trust architecture is now the default. Here is how I implement authentication in production applications.'),
        h3('Passkeys: The Password Replacement'),
        p('Passkeys use public-key cryptography stored on user devices. They are phishing-resistant, cannot be reused across sites, and provide a seamless user experience. Most major platforms now support WebAuthn, making passkey adoption straightforward.'),
        code('typescript', `// NestJS Passkey Registration Endpoint
@Post('auth/passkey/register')
async registerPasskey(
  @CurrentUser() user: User,
  @Body() dto: RegisterPasskeyDto,
) {
  const options = await generateRegistrationOptions({
    rpName: 'Empire Crypto Trading',
    rpID: 'empirecryptotrading.com',
    userID: user.id,
    userName: user.email,
    attestationType: 'none',
    authenticatorSelection: {
      residentKey: 'required',
      userVerification: 'preferred',
    },
  });

  await this.authService.storeChallenge(user.id, options.challenge);
  return options;
}`, 'auth.controller.ts'),
        h3('JWT + Refresh Token Architecture'),
        p('For API-based applications, JWT with refresh token rotation remains the most practical approach. The key improvements in 2026 are shorter access token lifetimes (5 minutes), automatic rotation on every refresh, and token binding to prevent theft.'),
        code('typescript', `// Token rotation strategy
interface TokenPair {
  accessToken: string;  // 5-minute expiry
  refreshToken: string; // 7-day expiry, single-use
}

async rotateTokens(refreshToken: string): Promise<TokenPair> {
  const payload = await this.verifyRefreshToken(refreshToken);

  // Invalidate the used refresh token immediately
  await this.tokenStore.revoke(refreshToken);

  // Check for token reuse (potential theft)
  if (payload.used) {
    await this.tokenStore.revokeAllForUser(payload.sub);
    throw new UnauthorizedException('Token reuse detected');
  }

  return this.generateTokenPair(payload.sub);
}`, 'token.service.ts'),
        h3('Zero-Trust API Security'),
        ul([
          'Every request is authenticated and authorized—no implicit trust',
          'Service-to-service communication uses mTLS certificates',
          'Rate limiting and anomaly detection on all endpoints',
          'Request signing for sensitive operations (trades, withdrawals)',
          'Audit logging for compliance and forensics',
        ]),
        blockquote('Security is not a feature you add later—it is an architectural decision you make from day one. Every endpoint, every service boundary, every data flow must be designed with security in mind.'),
      ],
    },
    {
      _id: '2026-03',
      title: 'Building Scalable Trading Platforms End-to-End',
      slug: { current: 'building-scalable-trading-platforms-end-to-end' },
      excerpt: 'Lessons learned from building Empire Crypto Trading: architecture decisions, real-time data pipelines, and scaling to 50K+ concurrent users.',
      publishedAt: '2026-02-05T10:00:00Z',
      author: 'John Pecson',
      categories: ['Architecture', 'Trading', 'Full-Stack'],
      mainImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
      body: [
        h2('Architecture of a Modern Trading Platform'),
        p('Building Empire Crypto Trading taught me that trading platforms have unique requirements: sub-second latency for market data, exactly-once processing for orders, and the ability to handle massive traffic spikes during market volatility. Here is the architecture that handles 50K+ concurrent traders.'),
        h3('System Architecture Overview'),
        p('The platform is split into distinct services: a Next.js frontend for the trading UI, a NestJS API gateway, dedicated microservices for order processing and market data, and a WebSocket layer for real-time updates. Each service scales independently based on load.'),
        code('typescript', `// WebSocket Gateway for Real-Time Market Data
@WebSocketGateway({ cors: true, namespace: '/market' })
export class MarketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private subscriptions = new Map<string, Set<string>>();

  handleConnection(client: Socket) {
    // Authenticate via JWT in handshake
    const token = client.handshake.auth.token;
    const user = this.authService.verify(token);
    client.data.userId = user.id;
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(client: Socket, pairs: string[]) {
    pairs.forEach(pair => {
      if (!this.subscriptions.has(pair)) {
        this.subscriptions.set(pair, new Set());
      }
      this.subscriptions.get(pair)!.add(client.id);
      client.join(\`market:\${pair}\`);
    });
  }

  broadcastPrice(pair: string, data: PriceUpdate) {
    this.server.to(\`market:\${pair}\`).emit('price', data);
  }
}`, 'market.gateway.ts'),
        h3('Database Strategy'),
        p('We use PostgreSQL for transactional data (orders, portfolios, user accounts) and Redis for real-time state (order books, session data, rate limiting). DynamoDB handles audit logs and analytics data where we need cost-effective storage at scale.'),
        ul([
          'PostgreSQL: ACID-compliant order processing with row-level locking',
          'Redis: Sub-millisecond reads for order book snapshots and price caches',
          'DynamoDB: Cost-effective storage for billions of trade history records',
          'Connection pooling with PgBouncer for handling 10K+ concurrent DB connections',
        ]),
        h3('Scaling for Market Volatility'),
        p('Crypto markets can spike 10x normal traffic in minutes. We use AWS ECS with auto-scaling policies that react to both CPU usage and custom CloudWatch metrics (WebSocket connection count, order queue depth). Pre-warming strategies ensure new instances are ready before traffic hits.'),
        h3('Lessons Learned'),
        ol([
          'Design for failure: every external dependency will go down at the worst time',
          'Idempotency keys on all mutation endpoints prevent duplicate orders',
          'Feature flags let you disable non-critical features during traffic spikes',
          'Invest in observability early—you cannot fix what you cannot measure',
          'Load test with realistic patterns, not just raw throughput numbers',
        ]),
        blockquote('The best trading platform is one where users never think about the technology. They just trade. Every millisecond of latency, every UI interaction, every error message matters.'),
      ],
    },
    {
      _id: '2026-04',
      title: 'The Modern Web3 Development Stack in 2026',
      slug: { current: 'modern-web3-development-stack-2026' },
      excerpt: 'A practical guide to the Web3 development stack in 2026: frameworks, testing tools, deployment strategies, and lessons from building production dApps.',
      publishedAt: '2026-02-12T10:00:00Z',
      author: 'John Pecson',
      categories: ['Web3', 'Blockchain', 'Ethereum'],
      mainImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
      body: [
        h2('Web3 Development Has Grown Up'),
        p('When I started building blockchain applications at NEM Foundation in 2018, the tooling was primitive. In 2026, the Web3 development stack has matured significantly. Frameworks like Hardhat and Foundry provide robust development environments, Ethers.js v6 offers a clean API, and deployment pipelines are now as sophisticated as traditional web apps.'),
        h3('The Stack'),
        p('My current Web3 stack for production dApps combines battle-tested tools with modern developer experience:'),
        ul([
          'Smart Contracts: Solidity 0.8.x with Hardhat for development and testing',
          'Frontend: Next.js + wagmi + viem for type-safe blockchain interactions',
          'Indexing: The Graph or custom event indexers for historical data',
          'Testing: Hardhat + Chai for unit tests, Foundry for fuzz testing',
          'Deployment: Hardhat Ignition for reproducible deployments across networks',
        ]),
        h3('Type-Safe Contract Interactions'),
        p('One of the biggest improvements in Web3 development is type safety. Using wagmi with TypeScript, you get full type inference from your contract ABIs, catching errors at compile time instead of runtime.'),
        code('typescript', `// Type-safe contract interaction with wagmi v2
import { useReadContract, useWriteContract } from 'wagmi';
import { tradingAbi } from '@/contracts/trading';

function TradePanel({ pair }: { pair: string }) {
  const { data: price } = useReadContract({
    address: TRADING_CONTRACT,
    abi: tradingAbi,
    functionName: 'getPrice',
    args: [pair],
  });

  const { writeContract } = useWriteContract();

  const executeTrade = (amount: bigint) => {
    writeContract({
      address: TRADING_CONTRACT,
      abi: tradingAbi,
      functionName: 'executeTrade',
      args: [pair, amount],
    });
  };

  return (
    <div>
      <p>Current Price: {formatEther(price ?? 0n)}</p>
      <button onClick={() => executeTrade(parseEther('1.0'))}>
        Trade 1 ETH
      </button>
    </div>
  );
}`, 'TradePanel.tsx'),
        h3('Smart Contract Testing Strategy'),
        p('Testing smart contracts requires a different mindset than testing web applications. You need to test not just happy paths but also attack vectors, edge cases with extreme values, and gas optimization. I use a three-layer testing approach:'),
        ol([
          'Unit tests with Hardhat: Test individual functions with expected inputs and outputs',
          'Integration tests: Test contract interactions and state transitions across multiple calls',
          'Fuzz testing with Foundry: Generate random inputs to find edge cases you would never think of',
        ]),
        blockquote('In Web3, a bug in production can mean permanent loss of user funds. The cost of insufficient testing is orders of magnitude higher than in traditional web development. Test everything, then test it again.'),
        h3('Deployment Best Practices'),
        p('Deploying smart contracts is irreversible (without proxy patterns), so the deployment process must be rigorous. We use multi-sig wallets for contract ownership, timelock contracts for governance changes, and automated verification on block explorers. Every deployment goes through a staging environment on a testnet before touching mainnet.'),
      ],
    },
    {
      _id: '2026-05',
      title: 'Migrating Legacy Systems to Next.js: A Practical Guide',
      slug: { current: 'migrating-legacy-systems-to-nextjs' },
      excerpt: 'Step-by-step strategies for migrating legacy frontend applications to Next.js 15, including incremental adoption, routing migration, and performance wins.',
      publishedAt: '2026-02-19T10:00:00Z',
      author: 'John Pecson',
      categories: ['Next.js', 'Migration', 'Architecture'],
      mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      body: [
        h2('Why Migrate to Next.js?'),
        p('Legacy frontend applications built with Create React App, Angular, or vanilla JavaScript often suffer from poor performance, complex build configurations, and limited SEO capabilities. Next.js 15 with the App Router solves these problems with server components, streaming SSR, and built-in optimizations. But migration is not trivial—here is how to do it incrementally.'),
        h3('The Incremental Migration Strategy'),
        p('The biggest mistake teams make is attempting a full rewrite. Instead, I recommend an incremental approach: run both systems in parallel and migrate routes one at a time. This reduces risk and lets you ship improvements continuously.'),
        ul([
          'Phase 1: Set up Next.js alongside the legacy app with shared authentication',
          'Phase 2: Migrate static pages first (about, docs, marketing) for quick SEO wins',
          'Phase 3: Migrate feature pages incrementally, starting with the simplest ones',
          'Phase 4: Move shared components to a common package used by both apps',
          'Phase 5: Migrate the remaining pages and decommission the legacy app',
        ]),
        h3('Routing Migration'),
        p('If your legacy app uses React Router, the migration to Next.js file-based routing requires careful planning. Map every existing route to the new App Router structure before writing any code.'),
        code('typescript', `// Route mapping example
// Legacy React Router:
// /dashboard         -> app/dashboard/page.tsx
// /dashboard/trades  -> app/dashboard/trades/page.tsx
// /profile/:id       -> app/profile/[id]/page.tsx
// /settings/*        -> app/settings/[...slug]/page.tsx

// Next.js App Router layout for shared UI
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}`, 'app/dashboard/layout.tsx'),
        h3('State Management Migration'),
        p('Legacy apps often rely heavily on client-side state (Redux, MobX). With Next.js server components, much of this state can move to the server. The pattern is: fetch data in server components, pass it down as props, and only use client-side state for truly interactive elements.'),
        h3('Performance Wins'),
        p('The performance improvements from migration are typically dramatic:'),
        ol([
          'First Contentful Paint drops by 40-60% with server-side rendering',
          'Bundle size decreases by 30-50% with automatic code splitting',
          'Core Web Vitals improve significantly with Next.js Image and Font optimization',
          'SEO improves immediately with proper meta tags and server-rendered content',
        ]),
        blockquote('Migration is not just a technical exercise—it is an opportunity to rethink your architecture, clean up technical debt, and set your team up for the next five years of development.'),
        p('The key to a successful migration is patience and incrementalism. Ship small improvements every week, measure the impact, and build confidence in the new system before migrating critical paths.'),
      ],
    },
  ]
}
