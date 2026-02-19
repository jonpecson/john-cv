import { BlogPost } from '@/types/blog'
import { h2, h3, p, code, ul, ol, blockquote } from '@/lib/portable-text-helpers'

export function getPosts2025(): BlogPost[] {
  return [
    // ── January ────────────────────────────────────────────────────────
    {
      _id: '2025-01',
      title: "What's New in Next.js 15",
      slug: { current: 'whats-new-in-nextjs-15' },
      excerpt:
        'A deep dive into the latest features, performance improvements, and breaking changes in Next.js 15.',
      publishedAt: '2025-01-10',
      author: 'John Pecson',
      categories: ['Next.js', 'React', 'Web Development'],
      mainImage:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      body: [
        h2('The Biggest Release Yet'),
        p(
          'Next.js 15 represents a significant leap forward for the React framework ecosystem. With the stable release of the App Router, React Server Components by default, and a completely revamped caching strategy, this version changes how we think about building web applications.'
        ),
        p(
          'After months of release candidates and community feedback, the Vercel team shipped a polished product that addresses many of the pain points developers experienced with earlier versions. Let us walk through the most impactful changes.'
        ),
        h3('Revamped Caching Semantics'),
        p(
          'One of the most significant breaking changes is that fetch requests, GET Route Handlers, and client-side navigations are no longer cached by default. Previously, aggressive caching led to stale data issues that confused many developers. Now you opt into caching explicitly, giving you full control over data freshness.'
        ),
        code(
          'typescript',
          `// Next.js 15 — explicit caching
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }, // Cache for 1 hour
})

// No cache option needed for dynamic data — it's the default
const live = await fetch('https://api.example.com/live-prices')`
        ),
        h3('Partial Pre-Rendering (PPR)'),
        p(
          'Partial Pre-Rendering is the headline feature. It combines static shell rendering with dynamic streaming in a single HTTP request. The static parts of your page are served instantly from the CDN, while dynamic sections stream in as they become ready. This eliminates the binary choice between static and dynamic rendering.'
        ),
        code(
          'typescript',
          `// Enable PPR in next.config.mjs
export default {
  experimental: {
    ppr: 'incremental',
  },
}

// Mark dynamic sections with Suspense
import { Suspense } from 'react'

export default function Page() {
  return (
    <main>
      <StaticHeader />
      <Suspense fallback={<PriceSkeleton />}>
        <LivePriceWidget />
      </Suspense>
    </main>
  )
}`,
          'next.config.mjs'
        ),
        h3('Other Notable Improvements'),
        ...ul([
          'React 19 support with built-in Actions and useOptimistic',
          'next/after API for executing code after a response finishes streaming',
          'Turbopack is now stable for the dev server, offering up to 76% faster local startup',
          'Enhanced TypeScript support for next.config.ts files',
          'Improved error overlay with source maps and better stack traces',
        ]),
        blockquote(
          'Next.js 15 is not just an incremental update — it redefines the developer experience for React-based web applications.'
        ),
        p(
          'Upgrading from Next.js 14 requires careful attention to the caching changes. The official codemod handles most of the migration, but I recommend auditing your data-fetching patterns manually to ensure nothing breaks in production.'
        ),
      ],
    },
    {
      _id: '2025-02',
      title: 'Building Real-Time Crypto Dashboards',
      slug: { current: 'building-real-time-crypto-dashboards' },
      excerpt:
        'How to architect and build a real-time cryptocurrency dashboard using WebSockets, React, and live market data.',
      publishedAt: '2025-01-24',
      author: 'John Pecson',
      categories: ['Crypto', 'WebSocket', 'React'],
      mainImage:
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
      body: [
        h2('Real-Time Data in Crypto Trading'),
        p(
          'In the cryptocurrency world, data that is even a few seconds old can mean the difference between a profitable trade and a missed opportunity. Building a real-time dashboard requires careful consideration of WebSocket connections, state management, and rendering performance.'
        ),
        p(
          'Over the past year at Empire Crypto Trading, I have built multiple dashboards handling live price feeds from exchanges like Binance, Coinbase, and Kraken simultaneously. Here is what I have learned about making them fast and reliable.'
        ),
        h3('WebSocket Architecture'),
        p(
          'The foundation is a robust WebSocket connection layer that handles reconnection, message queuing, and backpressure. Rather than connecting directly to exchange WebSocket APIs from the frontend, I route through a backend aggregator that normalizes data across exchanges.'
        ),
        code(
          'typescript',
          `// WebSocket hook with auto-reconnect
function useCryptoStream(symbols: string[]) {
  const [prices, setPrices] = useState<Map<string, TickerData>>(new Map())
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    function connect() {
      const ws = new WebSocket('wss://stream.empire-crypto.com/v1/tickers')
      wsRef.current = ws

      ws.onopen = () => {
        ws.send(JSON.stringify({ subscribe: symbols }))
      }

      ws.onmessage = (event) => {
        const data: TickerData = JSON.parse(event.data)
        setPrices(prev => new Map(prev).set(data.symbol, data))
      }

      ws.onclose = () => {
        reconnectTimer.current = setTimeout(connect, 2000)
      }
    }

    connect()
    return () => {
      wsRef.current?.close()
      clearTimeout(reconnectTimer.current)
    }
  }, [symbols])

  return prices
}`,
          'useCryptoStream.ts'
        ),
        h3('Optimizing React Renders'),
        p(
          'With prices updating multiple times per second, naive state management will choke React. The key is to batch updates and only re-render the components that actually need new data. I use a combination of React.memo, useMemo, and a publish-subscribe pattern to minimize unnecessary renders.'
        ),
        ...ul([
          'Batch WebSocket messages into 100ms windows before updating state',
          'Use React.memo with custom comparison functions on price cells',
          'Virtualize long token lists with react-window for DOM efficiency',
          'Debounce chart redraws to 250ms intervals for smooth animations',
        ]),
        h3('Handling Data Reliability'),
        p(
          'Exchange WebSocket feeds are not always reliable. Connections drop, messages arrive out of order, and data gaps happen. Building a resilient system means implementing heartbeat checks, sequence number validation, and fallback REST polling when the stream goes down.'
        ),
        blockquote(
          'The best real-time dashboard is the one that fails gracefully. Users should never see stale data without knowing it is stale.'
        ),
        p(
          'For production deployments, I recommend keeping WebSocket connections server-side and using Server-Sent Events to push to the browser. This simplifies authentication, reduces the number of exchange connections, and makes it easier to add data transformations in the pipeline.'
        ),
      ],
    },

    // ── February ───────────────────────────────────────────────────────
    {
      _id: '2025-03',
      title: 'NestJS Advanced Patterns: Custom Decorators and Providers',
      slug: { current: 'nestjs-advanced-patterns-custom-decorators-providers' },
      excerpt:
        'Master advanced NestJS patterns including custom parameter decorators, dynamic providers, and the module system.',
      publishedAt: '2025-02-06',
      author: 'John Pecson',
      categories: ['NestJS', 'TypeScript', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
      body: [
        h2('Beyond the Basics of NestJS'),
        p(
          'NestJS is an incredibly powerful framework once you move past the standard controller-service-module pattern. Custom decorators, dynamic module registration, and advanced provider patterns let you build highly reusable and testable backend architectures. These patterns have been the backbone of every NestJS project I have built in production.'
        ),
        h3('Custom Parameter Decorators'),
        p(
          'Parameter decorators are one of the most underused features in NestJS. Instead of accessing the raw request object in every handler, you can create decorators that extract and validate exactly the data your handler needs.'
        ),
        code(
          'typescript',
          `import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user
    return data ? user?.[data] : user
  },
)

// Usage in a controller
@Get('profile')
getProfile(@CurrentUser() user: User) {
  return this.usersService.getProfile(user.id)
}

@Get('dashboard')
getDashboard(@CurrentUser('organizationId') orgId: string) {
  return this.dashboardService.getForOrg(orgId)
}`,
          'current-user.decorator.ts'
        ),
        h3('Dynamic Module Registration'),
        p(
          'Dynamic modules let you create configurable, reusable packages. This is how libraries like @nestjs/typeorm and @nestjs/jwt work under the hood. The pattern involves a static forRoot or forRootAsync method that returns a DynamicModule.'
        ),
        code(
          'typescript',
          `@Module({})
export class CryptoModule {
  static forRoot(options: CryptoModuleOptions): DynamicModule {
    return {
      module: CryptoModule,
      providers: [
        { provide: 'CRYPTO_OPTIONS', useValue: options },
        CryptoService,
        PriceAggregator,
      ],
      exports: [CryptoService],
    }
  }

  static forRootAsync(options: CryptoModuleAsyncOptions): DynamicModule {
    return {
      module: CryptoModule,
      imports: options.imports || [],
      providers: [
        {
          provide: 'CRYPTO_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        CryptoService,
        PriceAggregator,
      ],
      exports: [CryptoService],
    }
  }
}`,
          'crypto.module.ts'
        ),
        h3('Key Patterns to Remember'),
        ...ul([
          'Use custom decorators to reduce boilerplate and enforce consistency',
          'Leverage injection scopes (DEFAULT, REQUEST, TRANSIENT) for different lifecycle needs',
          'Implement factory providers for conditional service creation',
          'Use module references for lazy-loading and circular dependency resolution',
        ]),
        blockquote(
          'A well-structured NestJS application reads like documentation. Each module, provider, and decorator tells a clear story about the system architecture.'
        ),
        p(
          'These patterns scale remarkably well. On a recent trading platform project, we had over 40 modules with shared providers, and the dependency injection system kept everything clean and testable.'
        ),
      ],
    },
    {
      _id: '2025-04',
      title: 'Multi-Database Architecture Design Patterns',
      slug: { current: 'multi-database-architecture-design-patterns' },
      excerpt:
        'Strategies for designing systems that use multiple databases effectively, from polyglot persistence to CQRS.',
      publishedAt: '2025-02-21',
      author: 'John Pecson',
      categories: ['Database', 'Architecture', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      body: [
        h2('Why One Database Is Not Enough'),
        p(
          'Modern applications have diverse data requirements that a single database engine cannot optimally serve. Relational data, time-series metrics, full-text search, caching layers, and event streams all benefit from purpose-built storage engines. The challenge is orchestrating these systems without creating a maintenance nightmare.'
        ),
        p(
          'Polyglot persistence is the practice of using different database technologies for different data storage needs within the same application. When done right, it lets each subsystem leverage the strengths of its chosen storage engine.'
        ),
        h3('Common Multi-Database Patterns'),
        ...ol([
          'CQRS (Command Query Responsibility Segregation) — separate write and read models using different databases',
          'Event Sourcing with projections — store events in an append-only log and project into read-optimized stores',
          'Cache-aside with Redis — keep hot data in Redis while persisting to PostgreSQL',
          'Search index synchronization — mirror relational data into Elasticsearch for full-text search',
        ]),
        h3('Implementing a Dual-Database Pattern'),
        p(
          'Here is a practical example of a service that writes to PostgreSQL for durability and syncs to Redis for fast reads. This pattern is essential for trading platforms where read latency must be minimal.'
        ),
        code(
          'typescript',
          `@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio) private portfolioRepo: Repository<Portfolio>,
    private redis: RedisService,
  ) {}

  async updateHolding(userId: string, asset: string, qty: number) {
    // Write to PostgreSQL (source of truth)
    const holding = await this.portfolioRepo.save({
      userId, asset, quantity: qty, updatedAt: new Date(),
    })

    // Sync to Redis for fast reads
    await this.redis.hset(
      \`portfolio:\${userId}\`,
      asset,
      JSON.stringify(holding),
    )

    return holding
  }

  async getPortfolio(userId: string): Promise<Holding[]> {
    // Try Redis first
    const cached = await this.redis.hgetall(\`portfolio:\${userId}\`)
    if (Object.keys(cached).length > 0) {
      return Object.values(cached).map(v => JSON.parse(v))
    }

    // Fall back to PostgreSQL
    const holdings = await this.portfolioRepo.find({ where: { userId } })
    // Warm the cache
    const pipeline = this.redis.pipeline()
    for (const h of holdings) {
      pipeline.hset(\`portfolio:\${userId}\`, h.asset, JSON.stringify(h))
    }
    await pipeline.exec()
    return holdings
  }
}`,
          'portfolio.service.ts'
        ),
        h3('Consistency Challenges'),
        p(
          'The hardest part of multi-database architectures is maintaining consistency. You must decide where eventual consistency is acceptable and where you need strong guarantees. For financial data, I use the Outbox Pattern to ensure that database writes and event publications are atomic.'
        ),
        ...ul([
          'Use database transactions for critical writes',
          'Implement the Outbox Pattern for reliable cross-system synchronization',
          'Monitor replication lag between primary and read replicas',
          'Design idempotent consumers to handle duplicate events gracefully',
        ]),
        blockquote(
          'Choose the simplest architecture that meets your requirements. Multi-database systems add operational complexity — make sure the benefits justify the cost.'
        ),
      ],
    },

    // ── March ──────────────────────────────────────────────────────────
    {
      _id: '2025-05',
      title: 'Web3.js vs Ethers.js: A 2025 Comparison',
      slug: { current: 'web3js-vs-ethersjs-2025-comparison' },
      excerpt:
        'An updated comparison of the two dominant Ethereum JavaScript libraries, including the latest v6 changes.',
      publishedAt: '2025-03-07',
      author: 'John Pecson',
      categories: ['Web3', 'Ethereum', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&h=400&fit=crop',
      body: [
        h2('The Ethereum Developer Toolkit in 2025'),
        p(
          'The choice between Web3.js and Ethers.js remains one of the first decisions Ethereum developers face. Both libraries have matured significantly — Web3.js released its 4.x rewrite while Ethers.js v6 introduced breaking changes of its own. This comparison reflects the state of both libraries as of early 2025.'
        ),
        h3('Bundle Size and Tree-Shaking'),
        p(
          'Ethers.js v6 was designed with modularity in mind. You can import only the sub-packages you need, resulting in significantly smaller bundles. Web3.js 4.x also improved here with a plugin-based architecture, but the full install is still heavier.'
        ),
        code(
          'typescript',
          `// Ethers.js v6 — modular imports
import { JsonRpcProvider, Contract, parseEther } from 'ethers'

const provider = new JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_KEY')
const balance = await provider.getBalance('0x...')

// Web3.js 4.x — also improved
import Web3 from 'web3'

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_KEY')
const balance = await web3.eth.getBalance('0x...')`,
          'comparison.ts'
        ),
        h3('Key Differences'),
        ...ul([
          'Ethers.js separates Provider (read) from Signer (write) — cleaner separation of concerns',
          'Web3.js uses a single Web3 instance for everything — simpler API surface',
          'Ethers.js has better TypeScript support with generated contract types via TypeChain',
          'Web3.js 4.x introduced a plugin system for extending functionality',
          'Ethers.js v6 uses native BigInt instead of the custom BigNumber class',
          'Web3.js has broader ecosystem support in legacy dApps and tutorials',
        ]),
        h3('Contract Interactions'),
        p(
          'Both libraries handle smart contract interactions well, but the ergonomics differ. Ethers.js contract instances feel more natural in TypeScript projects because you get typed method calls when using TypeChain-generated types.'
        ),
        code(
          'typescript',
          `// Ethers.js — typed contract interaction
const token = new Contract(TOKEN_ADDRESS, ERC20_ABI, signer)
const tx = await token.transfer(recipient, parseEther('10.0'))
await tx.wait()

// Web3.js — contract interaction
const token = new web3.eth.Contract(ERC20_ABI, TOKEN_ADDRESS)
const tx = await token.methods
  .transfer(recipient, web3.utils.toWei('10', 'ether'))
  .send({ from: account })`,
          'contracts.ts'
        ),
        blockquote(
          'For new projects in 2025, I recommend Ethers.js v6 for its TypeScript support, smaller bundle size, and cleaner API design. Web3.js remains a solid choice if your team is already invested in its ecosystem.'
        ),
        p(
          'Regardless of which library you choose, consider abstracting your blockchain interactions behind a service layer. This makes it possible to swap libraries later or support multiple chains without rewriting business logic.'
        ),
      ],
    },
    {
      _id: '2025-06',
      title: 'TypeScript 5 Features You Should Be Using',
      slug: { current: 'typescript-5-features-you-should-be-using' },
      excerpt:
        'A practical guide to the most impactful TypeScript 5.x features that improve developer experience and type safety.',
      publishedAt: '2025-03-21',
      author: 'John Pecson',
      categories: ['TypeScript', 'JavaScript', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      body: [
        h2('TypeScript 5.x: The Features That Matter'),
        p(
          'TypeScript 5 brought a wave of features that genuinely improve day-to-day development. From const type parameters to decorator metadata, these additions reduce boilerplate and catch more bugs at compile time. Here are the features I use most frequently in production codebases.'
        ),
        h3('Const Type Parameters'),
        p(
          'The const modifier on type parameters tells TypeScript to infer the narrowest possible type from a literal value. This eliminates the need for verbose "as const" assertions when calling generic functions.'
        ),
        code(
          'typescript',
          `// Without const type parameter
function createRoute<T extends string>(path: T) {
  return { path }
}
const route = createRoute('/api/users') // type: { path: string }

// With const type parameter
function createRoute<const T extends string>(path: T) {
  return { path }
}
const route = createRoute('/api/users') // type: { path: "/api/users" }

// Powerful for building type-safe APIs
function defineConfig<const T extends Record<string, unknown>>(config: T): T {
  return config
}`,
          'const-type-params.ts'
        ),
        h3('Decorator Metadata'),
        p(
          'TypeScript 5 supports the TC39 Stage 3 decorator proposal natively. Combined with decorator metadata, this enables powerful patterns for dependency injection, validation, and ORM mapping without experimental flags.'
        ),
        code(
          'typescript',
          `function validate(target: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name)
  return function (this: any, ...args: any[]) {
    console.log(\`Validating \${methodName} with args:\`, args)
    return target.call(this, ...args)
  }
}

class OrderService {
  @validate
  createOrder(userId: string, amount: number) {
    // Implementation
  }
}`,
          'decorators.ts'
        ),
        h3('More Essential Features'),
        ...ul([
          'satisfies operator — validate types without widening the inferred type',
          'using declarations — deterministic resource disposal with Symbol.dispose',
          'Bundler module resolution — better alignment with how modern bundlers resolve modules',
          'Verbatim module syntax — explicit control over import/export elision',
          'All enums as union types — better narrowing for enum members',
        ]),
        blockquote(
          'The satisfies operator alone has eliminated hundreds of type assertions across our codebase while maintaining precise type inference.'
        ),
        p(
          'I recommend enabling strict mode and incrementally adopting these features. The TypeScript compiler is remarkably good at guiding you through the changes with clear error messages.'
        ),
      ],
    },

    // ── April ──────────────────────────────────────────────────────────
    {
      _id: '2025-07',
      title: 'Building Real-Time Trading Systems with WebSockets',
      slug: { current: 'building-real-time-trading-systems-websockets' },
      excerpt:
        'Architecture patterns for building low-latency trading interfaces powered by WebSocket connections.',
      publishedAt: '2025-04-04',
      author: 'John Pecson',
      categories: ['Trading', 'WebSocket', 'Architecture'],
      mainImage:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
      body: [
        h2('The Architecture of Speed'),
        p(
          'Trading systems demand sub-second latency from data source to user interface. Every architectural decision — from the network protocol to the rendering strategy — must be optimized for speed. WebSockets provide the full-duplex communication channel that makes this possible, but using them effectively requires careful design.'
        ),
        p(
          'At Empire Crypto Trading, we process over 10,000 price updates per second across hundreds of trading pairs. Here is how we designed the system to handle this volume while keeping the UI responsive.'
        ),
        h3('Message Protocol Design'),
        p(
          'Raw JSON is too verbose for high-frequency trading data. We use a compact binary protocol for price updates and reserve JSON for less frequent messages like order confirmations and account updates.'
        ),
        code(
          'typescript',
          `// Compact message format for price tickers
interface TickerMessage {
  type: 'ticker'
  data: ArrayBuffer  // packed: symbol(8) + price(8) + volume(8) + timestamp(8)
}

// Decoder for binary ticker data
function decodeTicker(buffer: ArrayBuffer): TickerData {
  const view = new DataView(buffer)
  return {
    symbol: decodeSymbol(view, 0),
    price: view.getFloat64(8),
    volume: view.getFloat64(16),
    timestamp: view.getBigUint64(24),
  }
}

// Batch updates to reduce render cycles
class TickerBuffer {
  private buffer = new Map<string, TickerData>()
  private flushInterval: NodeJS.Timeout

  constructor(private onFlush: (data: Map<string, TickerData>) => void) {
    this.flushInterval = setInterval(() => this.flush(), 100)
  }

  add(ticker: TickerData) {
    this.buffer.set(ticker.symbol, ticker)
  }

  private flush() {
    if (this.buffer.size > 0) {
      this.onFlush(new Map(this.buffer))
      this.buffer.clear()
    }
  }
}`,
          'ticker-buffer.ts'
        ),
        h3('Connection Management'),
        ...ul([
          'Implement exponential backoff for reconnection attempts',
          'Use heartbeat pings every 15 seconds to detect dead connections',
          'Queue outgoing messages during reconnection to prevent data loss',
          'Maintain separate connections for market data and order management',
          'Implement circuit breakers to prevent cascading failures',
        ]),
        h3('Frontend Rendering Strategy'),
        p(
          'The UI must handle thousands of updates without dropping frames. We use a combination of requestAnimationFrame batching, virtual scrolling for order books, and WebGL-rendered candlestick charts for maximum performance.'
        ),
        blockquote(
          'In trading systems, perceived performance is just as important as actual latency. Smooth animations and instant visual feedback build user confidence.'
        ),
        p(
          'Testing is critical. We run load tests that simulate market volatility with 50x normal message volume to ensure the system degrades gracefully under extreme conditions rather than crashing.'
        ),
      ],
    },
    {
      _id: '2025-08',
      title: 'AWS Cost Optimization Strategies for Startups',
      slug: { current: 'aws-cost-optimization-strategies-startups' },
      excerpt:
        'Practical strategies to reduce AWS costs by 40-60% without sacrificing performance or reliability.',
      publishedAt: '2025-04-18',
      author: 'John Pecson',
      categories: ['AWS', 'DevOps', 'Cloud'],
      mainImage:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      body: [
        h2('Taming the AWS Bill'),
        p(
          'AWS bills have a way of spiraling out of control, especially at startups where engineers move fast and cost awareness takes a back seat to shipping features. After helping multiple startups reduce their AWS spend by 40-60%, I have identified repeatable patterns that deliver savings without compromising on performance.'
        ),
        h3('Right-Sizing Compute Resources'),
        p(
          'The single biggest source of waste is over-provisioned EC2 instances and ECS tasks. Most services run at 10-20% CPU utilization, which means you are paying for 80% idle capacity. AWS Compute Optimizer can analyze your usage patterns and suggest appropriate instance types.'
        ),
        code(
          'bash',
          `# Check current ECS service utilization
aws cloudwatch get-metric-statistics \\
  --namespace AWS/ECS \\
  --metric-name CPUUtilization \\
  --dimensions Name=ServiceName,Value=api-service \\
  --start-time 2025-04-01T00:00:00Z \\
  --end-time 2025-04-15T00:00:00Z \\
  --period 3600 \\
  --statistics Average Maximum

# Review EC2 right-sizing recommendations
aws compute-optimizer get-ec2-instance-recommendations \\
  --filters name=Finding,values=OVER_PROVISIONED`,
          'cost-check.sh'
        ),
        h3('Top Cost-Saving Strategies'),
        ...ol([
          'Use Savings Plans or Reserved Instances for predictable workloads (up to 72% savings)',
          'Implement auto-scaling with scheduled scaling for known traffic patterns',
          'Move infrequently accessed S3 data to Glacier or Intelligent-Tiering',
          'Use Spot Instances for batch processing and non-critical workloads',
          'Review and delete unused EBS volumes, snapshots, and Elastic IPs',
          'Consolidate small Lambda functions to reduce cold start overhead',
          'Use NAT Gateway alternatives like VPC endpoints for S3 and DynamoDB',
        ]),
        h3('Monitoring and Alerts'),
        p(
          'Set up AWS Budgets with alerts at 50%, 80%, and 100% of your target spend. Use Cost Explorer tags to attribute costs to teams and services. I recommend tagging every resource with environment, team, and service tags from day one.'
        ),
        blockquote(
          'The best time to optimize AWS costs is before you deploy. The second best time is right now. Every month of delay is money burned.'
        ),
        p(
          'One often-overlooked strategy is reviewing data transfer costs. Inter-AZ and internet-bound traffic can account for 15-30% of your total bill. Placing services that communicate frequently in the same AZ and using CloudFront for static assets can yield significant savings.'
        ),
      ],
    },

    // ── May ────────────────────────────────────────────────────────────
    {
      _id: '2025-09',
      title: 'Scaling Microservices in Production',
      slug: { current: 'scaling-microservices-in-production' },
      excerpt:
        'Lessons learned from scaling a microservices architecture to handle millions of daily transactions.',
      publishedAt: '2025-05-05',
      author: 'John Pecson',
      categories: ['Microservices', 'Architecture', 'DevOps'],
      mainImage:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      body: [
        h2('From Monolith to Millions of Transactions'),
        p(
          'Scaling microservices is not just about adding more instances behind a load balancer. It requires understanding bottlenecks, designing for failure, and implementing observability at every layer. After migrating a monolithic trading platform to microservices, here are the patterns that kept us running smoothly under heavy load.'
        ),
        h3('Service Decomposition Strategy'),
        p(
          'The first and most critical step is deciding where to draw service boundaries. We used Domain-Driven Design to identify bounded contexts: Order Management, Portfolio Tracking, Price Aggregation, User Authentication, and Notification Services. Each service owns its data store and communicates through well-defined APIs and event streams.'
        ),
        h3('Asynchronous Communication'),
        p(
          'Synchronous HTTP calls between services create tight coupling and cascade failures. We moved to an event-driven architecture using Amazon SQS and SNS for most inter-service communication.'
        ),
        code(
          'typescript',
          `// Order service publishes events
@Injectable()
export class OrderService {
  constructor(
    private readonly snsClient: SNSClient,
    private readonly orderRepo: OrderRepository,
  ) {}

  async executeOrder(order: CreateOrderDto): Promise<Order> {
    const saved = await this.orderRepo.save(order)

    // Publish event for downstream services
    await this.snsClient.send(new PublishCommand({
      TopicArn: process.env.ORDER_EVENTS_TOPIC,
      Message: JSON.stringify({
        type: 'ORDER_EXECUTED',
        data: saved,
        timestamp: new Date().toISOString(),
      }),
    }))

    return saved
  }
}`,
          'order.service.ts'
        ),
        h3('Scaling Patterns That Work'),
        ...ul([
          'Database-per-service with event-driven sync for read models',
          'Circuit breakers on all inter-service calls using resilience4j patterns',
          'Horizontal auto-scaling based on queue depth, not just CPU',
          'Request rate limiting at the API gateway level',
          'Distributed tracing with correlation IDs across all services',
          'Blue-green deployments for zero-downtime releases',
        ]),
        blockquote(
          'Microservices do not eliminate complexity — they redistribute it. Make sure your team has the operational maturity to manage distributed systems before making the switch.'
        ),
        p(
          'Observability is non-negotiable. We use OpenTelemetry for distributed tracing, Prometheus for metrics, and structured logging with correlation IDs that flow through every service call. Without this visibility, debugging production issues in a microservices architecture is nearly impossible.'
        ),
      ],
    },
    {
      _id: '2025-10',
      title: 'React 19 Concurrent Features Deep Dive',
      slug: { current: 'react-19-concurrent-features-deep-dive' },
      excerpt:
        'Understanding and leveraging React 19 concurrent rendering, Actions, useOptimistic, and the new use hook.',
      publishedAt: '2025-05-22',
      author: 'John Pecson',
      categories: ['React', 'Frontend', 'Performance'],
      mainImage:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      body: [
        h2('Concurrency Is No Longer Experimental'),
        p(
          'React 19 marks the point where concurrent features are no longer opt-in experiments but core parts of the framework. Actions, useOptimistic, useFormStatus, and the use hook fundamentally change how we handle asynchronous operations and user interactions. These features eliminate entire categories of boilerplate code.'
        ),
        h3('Actions: Simplifying Async Mutations'),
        p(
          'Actions replace the pattern of managing loading states, error handling, and optimistic updates manually. They work with both client-side and server-side mutations, providing a unified API for form submissions and data changes.'
        ),
        code(
          'typescript',
          `'use client'
import { useActionState, useOptimistic } from 'react'

function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo: string) => [
      ...state,
      { id: crypto.randomUUID(), text: newTodo, pending: true },
    ]
  )

  async function addTodo(prevState: any, formData: FormData) {
    const text = formData.get('todo') as string
    addOptimistic(text)

    try {
      const result = await createTodo(text)
      return { success: true, error: null }
    } catch (error) {
      return { success: false, error: 'Failed to add todo' }
    }
  }

  const [state, formAction, isPending] = useActionState(addTodo, null)

  return (
    <form action={formAction}>
      <input name="todo" disabled={isPending} />
      <button type="submit" disabled={isPending}>Add</button>
      {state?.error && <p className="error">{state.error}</p>}
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </form>
  )
}`,
          'todo-list.tsx'
        ),
        h3('The use Hook'),
        p(
          'The use hook lets you read resources like Promises and Context directly during render. Unlike other hooks, it can be called conditionally. This is particularly powerful for data fetching patterns where you want to suspend while data loads.'
        ),
        code(
          'typescript',
          `import { use, Suspense } from 'react'

function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise) // Suspends until resolved
  return <h1>{user.name}</h1>
}

// Parent component passes the promise
export default function Page() {
  const userPromise = fetchUser() // Start fetching immediately
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  )
}`,
          'use-hook.tsx'
        ),
        h3('What Changes in Practice'),
        ...ul([
          'No more manual isPending/isLoading state management for mutations',
          'Optimistic UI updates are built into the framework',
          'Form handling is dramatically simpler with progressive enhancement',
          'useFormStatus provides pending state without prop drilling',
          'Server and client actions share the same mental model',
        ]),
        blockquote(
          'React 19 does not just add features — it removes the need for patterns we have been using for years. Less code, fewer bugs, better UX.'
        ),
      ],
    },

    // ── June ───────────────────────────────────────────────────────────
    {
      _id: '2025-11',
      title: 'Blockchain Integration Patterns for Web Applications',
      slug: { current: 'blockchain-integration-patterns-web-applications' },
      excerpt:
        'Practical patterns for integrating blockchain functionality into traditional web applications.',
      publishedAt: '2025-06-06',
      author: 'John Pecson',
      categories: ['Blockchain', 'Web Development', 'Architecture'],
      mainImage:
        'https://images.unsplash.com/photo-1644143379190-77d67fe17f83?w=800&h=400&fit=crop',
      body: [
        h2('Bridging Web2 and Web3'),
        p(
          'Integrating blockchain into existing web applications does not mean rebuilding everything from scratch. The key is identifying where decentralized technology adds genuine value — such as asset ownership verification, trustless payments, or transparent audit trails — and integrating it surgically into your existing architecture.'
        ),
        h3('The Adapter Pattern for Blockchain'),
        p(
          'I use an adapter layer that abstracts blockchain interactions behind familiar service interfaces. This lets your application code remain blockchain-agnostic while supporting multiple chains and wallet providers.'
        ),
        code(
          'typescript',
          `// Blockchain service adapter
interface BlockchainAdapter {
  connect(): Promise<string>  // Returns wallet address
  getBalance(address: string): Promise<bigint>
  sendTransaction(tx: TransactionRequest): Promise<TransactionReceipt>
  readContract<T>(params: ContractReadParams): Promise<T>
  writeContract(params: ContractWriteParams): Promise<TransactionReceipt>
}

class EthereumAdapter implements BlockchainAdapter {
  private provider: BrowserProvider
  private signer: JsonRpcSigner | null = null

  async connect(): Promise<string> {
    this.provider = new BrowserProvider(window.ethereum)
    this.signer = await this.provider.getSigner()
    return this.signer.address
  }

  async getBalance(address: string): Promise<bigint> {
    return this.provider.getBalance(address)
  }

  async readContract<T>(params: ContractReadParams): Promise<T> {
    const contract = new Contract(params.address, params.abi, this.provider)
    return contract[params.method](...params.args)
  }

  // ... other methods
}`,
          'blockchain-adapter.ts'
        ),
        h3('Common Integration Points'),
        ...ul([
          'Wallet connection and authentication (Sign-In with Ethereum)',
          'On-chain payment processing with confirmation tracking',
          'NFT ownership verification for gated content or features',
          'Token balance checks for tiered access levels',
          'Smart contract event listening for real-time updates',
        ]),
        h3('Error Handling and UX'),
        p(
          'Blockchain transactions fail in ways that traditional API calls do not. Gas estimation errors, nonce conflicts, transaction reverts, and network congestion all require specific handling. Always provide clear feedback about transaction status and never leave users wondering if their action succeeded.'
        ),
        blockquote(
          'The best blockchain integrations are invisible to the user. They benefit from decentralization without needing to understand it.'
        ),
        p(
          'For server-side blockchain interactions, use a dedicated wallet management service with proper key storage in AWS KMS or HashiCorp Vault. Never store private keys in environment variables or application configuration.'
        ),
      ],
    },
    {
      _id: '2025-12',
      title: 'Monorepo CI/CD with Turborepo',
      slug: { current: 'monorepo-cicd-with-turborepo' },
      excerpt:
        'Setting up efficient CI/CD pipelines for monorepos using Turborepo with remote caching and task orchestration.',
      publishedAt: '2025-06-20',
      author: 'John Pecson',
      categories: ['CI/CD', 'Turborepo', 'DevOps'],
      mainImage:
        'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop',
      body: [
        h2('Why Turborepo for Monorepos'),
        p(
          'Managing a monorepo with multiple packages, applications, and shared libraries requires a build system that understands dependency graphs and can intelligently skip unnecessary work. Turborepo excels at this with its content-addressable caching and parallel task execution.'
        ),
        p(
          'Our monorepo at Empire Crypto Trading contains three Next.js applications, a NestJS API, twelve shared packages, and a Sanity Studio. Without Turborepo, CI builds took 25 minutes. With it, most builds complete in under 3 minutes thanks to remote caching.'
        ),
        h3('Project Structure'),
        code(
          'json',
          `{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}`,
          'turbo.json'
        ),
        h3('Remote Caching in CI'),
        p(
          'Remote caching is the killer feature. When a developer or CI runner builds a package, the output is uploaded to a shared cache. Subsequent builds that have the same inputs (source files, dependencies, environment variables) can download the cached output instead of rebuilding.'
        ),
        code(
          'yaml',
          `# GitHub Actions workflow with Turborepo
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      - run: pnpm turbo build test lint --filter="...[HEAD^1]"
        env:
          TURBO_TOKEN: \${{ secrets.TURBO_TOKEN }}
          TURBO_TEAM: empire-crypto`,
          '.github/workflows/ci.yml'
        ),
        h3('Key Benefits'),
        ...ul([
          'Build only what changed with the --filter flag',
          'Remote caching shares build artifacts across all developers and CI',
          'Parallel task execution respects the dependency graph',
          'Incremental adoption — works alongside existing build tools',
          'Cache hit rates of 80-95% for typical development workflows',
        ]),
        blockquote(
          'The fastest build is the one you do not have to run. Remote caching makes this a reality for monorepo teams.'
        ),
      ],
    },

    // ── July ───────────────────────────────────────────────────────────
    {
      _id: '2025-13',
      title: 'PostgreSQL Performance Tuning: A Complete Guide',
      slug: { current: 'postgresql-performance-tuning-complete-guide' },
      excerpt:
        'Practical strategies for optimizing PostgreSQL performance from query analysis to configuration tuning.',
      publishedAt: '2025-07-07',
      author: 'John Pecson',
      categories: ['PostgreSQL', 'Database', 'Performance'],
      mainImage:
        'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
      body: [
        h2('Getting the Most Out of PostgreSQL'),
        p(
          'PostgreSQL is remarkably performant out of the box, but production workloads often expose bottlenecks that require tuning. From query optimization to connection pooling and configuration adjustments, there are systematic approaches to squeezing maximum performance from your database.'
        ),
        h3('Query Analysis with EXPLAIN ANALYZE'),
        p(
          'The first step in any optimization effort is understanding where time is being spent. EXPLAIN ANALYZE shows the actual execution plan and timing for a query, revealing sequential scans, nested loops, and other performance killers.'
        ),
        code(
          'sql',
          `-- Analyze a slow query
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT o.id, o.total, u.email
FROM orders o
JOIN users u ON u.id = o.user_id
WHERE o.created_at > NOW() - INTERVAL '30 days'
  AND o.status = 'completed'
ORDER BY o.created_at DESC
LIMIT 50;

-- Create a covering index for this query pattern
CREATE INDEX idx_orders_status_created
  ON orders (status, created_at DESC)
  INCLUDE (total, user_id)
  WHERE status = 'completed';`,
          'query-analysis.sql'
        ),
        h3('Configuration Tuning'),
        p(
          'The default PostgreSQL configuration is designed to run on modest hardware. For production servers, several settings need adjustment based on your available memory and workload characteristics.'
        ),
        ...ul([
          'shared_buffers: Set to 25% of total RAM (e.g., 4GB for a 16GB server)',
          'effective_cache_size: Set to 75% of total RAM for query planner hints',
          'work_mem: Increase for complex sorts and joins (4-64MB depending on concurrency)',
          'maintenance_work_mem: Increase for faster VACUUM and index creation (512MB-1GB)',
          'max_connections: Keep low (100-200) and use PgBouncer for connection pooling',
          'random_page_cost: Lower to 1.1 for SSD storage to favor index scans',
        ]),
        h3('Connection Pooling'),
        p(
          'Each PostgreSQL connection consumes about 10MB of memory. Without connection pooling, a spike in application traffic can exhaust database connections and crash your server. PgBouncer in transaction mode solves this by multiplexing hundreds of application connections over a small pool of database connections.'
        ),
        code(
          'ini',
          `; PgBouncer configuration
[databases]
myapp = host=localhost port=5432 dbname=myapp

[pgbouncer]
listen_port = 6432
listen_addr = 0.0.0.0
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 25
reserve_pool_size = 5
reserve_pool_timeout = 3`,
          'pgbouncer.ini'
        ),
        blockquote(
          'Database performance tuning is not a one-time task. As your data grows and query patterns change, you need to continuously monitor and adapt your indexing and configuration strategy.'
        ),
      ],
    },
    {
      _id: '2025-14',
      title: 'WebSocket Scaling: Handling 50K Concurrent Connections',
      slug: { current: 'websocket-scaling-50k-concurrent-connections' },
      excerpt:
        'Architecture and implementation strategies for scaling WebSocket servers to handle tens of thousands of simultaneous connections.',
      publishedAt: '2025-07-22',
      author: 'John Pecson',
      categories: ['WebSocket', 'Scaling', 'Architecture'],
      mainImage:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      body: [
        h2('The 50K Connection Challenge'),
        p(
          'Scaling WebSocket connections is fundamentally different from scaling HTTP APIs. Each WebSocket connection is a persistent, stateful TCP connection that consumes server resources for its entire lifetime. Reaching 50,000 concurrent connections requires careful attention to memory management, OS-level tuning, and horizontal scaling strategies.'
        ),
        h3('OS-Level Tuning'),
        p(
          'Before writing any application code, the operating system needs to be configured to handle large numbers of connections. The default Linux settings are far too conservative for WebSocket servers.'
        ),
        code(
          'bash',
          `# /etc/sysctl.conf — increase connection limits
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
net.core.netdev_max_backlog = 65535
net.ipv4.ip_local_port_range = 1024 65535

# File descriptor limits — each connection needs one
fs.file-max = 2097152

# /etc/security/limits.conf
* soft nofile 1048576
* hard nofile 1048576

# TCP keepalive tuning
net.ipv4.tcp_keepalive_time = 60
net.ipv4.tcp_keepalive_intvl = 10
net.ipv4.tcp_keepalive_probes = 6`,
          'sysctl.conf'
        ),
        h3('Horizontal Scaling with Redis Pub/Sub'),
        p(
          'A single server cannot handle unlimited connections. To scale horizontally, we run multiple WebSocket server instances behind a load balancer and use Redis Pub/Sub to broadcast messages across all instances.'
        ),
        code(
          'typescript',
          `import { WebSocketServer } from 'ws'
import Redis from 'ioredis'

const pub = new Redis(process.env.REDIS_URL)
const sub = new Redis(process.env.REDIS_URL)

const wss = new WebSocketServer({ port: 8080 })
const clients = new Map<string, Set<WebSocket>>()

// Subscribe to channels
sub.subscribe('price-updates', 'notifications')
sub.on('message', (channel, message) => {
  const data = JSON.parse(message)
  const subscribers = clients.get(channel) || new Set()
  for (const ws of subscribers) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message)
    }
  }
})

// Publish from any server instance
async function broadcastPrice(symbol: string, price: number) {
  await pub.publish('price-updates', JSON.stringify({ symbol, price }))
}`,
          'ws-cluster.ts'
        ),
        h3('Key Scaling Strategies'),
        ...ul([
          'Use sticky sessions (IP hash) at the load balancer for connection affinity',
          'Implement connection draining for graceful server restarts',
          'Monitor memory per connection and set alerts at 80% capacity',
          'Use binary protocols (MessagePack, Protocol Buffers) to reduce bandwidth',
          'Implement backpressure when clients cannot consume messages fast enough',
        ]),
        blockquote(
          'Scale testing is not optional. Run load tests that simulate realistic connection patterns, including reconnections, idle connections, and message burst scenarios.'
        ),
      ],
    },

    // ── August ─────────────────────────────────────────────────────────
    {
      _id: '2025-15',
      title: 'NestJS Guards, Interceptors, and Pipes Explained',
      slug: { current: 'nestjs-guards-interceptors-pipes-explained' },
      excerpt:
        'A comprehensive guide to the NestJS request lifecycle and how to use guards, interceptors, and pipes effectively.',
      publishedAt: '2025-08-04',
      author: 'John Pecson',
      categories: ['NestJS', 'TypeScript', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop',
      body: [
        h2('Understanding the NestJS Request Pipeline'),
        p(
          'NestJS processes every incoming request through a well-defined pipeline: Middleware, Guards, Interceptors (before), Pipes, Route Handler, Interceptors (after), and Exception Filters. Understanding this pipeline is essential for building clean, reusable backend logic.'
        ),
        h3('Guards: Authentication and Authorization'),
        p(
          'Guards determine whether a request should be handled by the route handler. They run after middleware but before interceptors and pipes, making them ideal for authentication and role-based access control.'
        ),
        code(
          'typescript',
          `@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) return true

    const { user } = context.switchToHttp().getRequest()
    return requiredRoles.some((role) => user.roles?.includes(role))
  }
}

// Usage with custom decorator
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('admin/dashboard')
getAdminDashboard() {
  return this.adminService.getDashboard()
}`,
          'roles.guard.ts'
        ),
        h3('Interceptors: Cross-Cutting Concerns'),
        p(
          'Interceptors wrap the route handler execution, allowing you to add logic before and after. Common use cases include logging, response transformation, caching, and timeout handling.'
        ),
        code(
          'typescript',
          `@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    const { method, url } = req
    const start = Date.now()

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start
        this.logger.log(\`\${method} \${url} - \${duration}ms\`)
      }),
      catchError((error) => {
        const duration = Date.now() - start
        this.logger.error(\`\${method} \${url} - \${duration}ms - \${error.message}\`)
        throw error
      }),
    )
  }
}`,
          'logging.interceptor.ts'
        ),
        h3('Pipes: Validation and Transformation'),
        ...ul([
          'ValidationPipe — automatically validate DTOs using class-validator decorators',
          'ParseIntPipe — transform string parameters to integers with validation',
          'DefaultValuePipe — provide fallback values for optional parameters',
          'Custom pipes — implement complex transformation and validation logic',
        ]),
        blockquote(
          'The beauty of the NestJS pipeline is composability. Guards, interceptors, and pipes can be applied globally, per-controller, or per-route, giving you fine-grained control over request processing.'
        ),
        p(
          'I recommend applying ValidationPipe globally in your bootstrap function. This ensures every endpoint validates its input automatically, preventing invalid data from reaching your business logic.'
        ),
      ],
    },
    {
      _id: '2025-16',
      title: 'Smart Contract Testing with Hardhat',
      slug: { current: 'smart-contract-testing-with-hardhat' },
      excerpt:
        'A practical guide to writing comprehensive tests for Solidity smart contracts using Hardhat and Chai.',
      publishedAt: '2025-08-21',
      author: 'John Pecson',
      categories: ['Solidity', 'Hardhat', 'Testing'],
      mainImage:
        'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=400&fit=crop',
      body: [
        h2('Testing Smart Contracts Rigorously'),
        p(
          'Smart contracts handle real money and are immutable once deployed. A bug in a smart contract cannot be hotfixed — it requires a new deployment and potentially a migration of funds. This makes testing not just important but absolutely critical. Hardhat provides an excellent testing environment with built-in Solidity debugging and fast local blockchain execution.'
        ),
        h3('Setting Up the Test Environment'),
        p(
          'Hardhat Network is a local Ethereum network designed for development. It runs in-process, making tests fast and deterministic. Combined with ethers.js and Chai matchers from @nomicfoundation/hardhat-chai-matchers, you get a powerful testing toolkit.'
        ),
        code(
          'typescript',
          `import { expect } from 'chai'
import { ethers } from 'hardhat'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'

describe('TokenVault', function () {
  async function deployFixture() {
    const [owner, user1, user2] = await ethers.getSigners()
    const Token = await ethers.getContractFactory('MockERC20')
    const token = await Token.deploy('Test Token', 'TT', 18)

    const Vault = await ethers.getContractFactory('TokenVault')
    const vault = await Vault.deploy(await token.getAddress())

    // Mint tokens for testing
    await token.mint(user1.address, ethers.parseEther('1000'))
    await token.connect(user1).approve(await vault.getAddress(), ethers.MaxUint256)

    return { vault, token, owner, user1, user2 }
  }

  it('should accept deposits', async function () {
    const { vault, token, user1 } = await loadFixture(deployFixture)
    const amount = ethers.parseEther('100')

    await expect(vault.connect(user1).deposit(amount))
      .to.emit(vault, 'Deposited')
      .withArgs(user1.address, amount)

    expect(await vault.balanceOf(user1.address)).to.equal(amount)
  })

  it('should reject withdrawal exceeding balance', async function () {
    const { vault, user1 } = await loadFixture(deployFixture)
    const amount = ethers.parseEther('500')

    await expect(vault.connect(user1).withdraw(amount))
      .to.be.revertedWith('Insufficient balance')
  })
})`,
          'TokenVault.test.ts'
        ),
        h3('Testing Patterns for Smart Contracts'),
        ...ol([
          'Use loadFixture for test isolation — each test starts from a clean state',
          'Test all revert conditions — every require statement needs a corresponding test',
          'Test access control — verify that only authorized addresses can call admin functions',
          'Test edge cases — zero amounts, maximum values, boundary conditions',
          'Test event emissions — events are the primary way frontends track contract state changes',
          'Use time manipulation — hardhat_mine and evm_increaseTime for time-dependent logic',
        ]),
        h3('Gas Optimization Testing'),
        p(
          'Hardhat also lets you measure gas consumption, which is crucial for cost optimization. Use the hardhat-gas-reporter plugin to track gas usage across test runs and catch regressions.'
        ),
        blockquote(
          'If a smart contract function does not have a test, assume it is broken. In the world of immutable code, untested is unacceptable.'
        ),
      ],
    },

    // ── September ──────────────────────────────────────────────────────
    {
      _id: '2025-17',
      title: 'AWS ECS Auto-Scaling Strategies',
      slug: { current: 'aws-ecs-auto-scaling-strategies' },
      excerpt:
        'Implementing effective auto-scaling for ECS Fargate services using target tracking, step scaling, and scheduled scaling.',
      publishedAt: '2025-09-08',
      author: 'John Pecson',
      categories: ['AWS', 'ECS', 'DevOps'],
      mainImage:
        'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
      body: [
        h2('Scaling ECS Services Intelligently'),
        p(
          'Auto-scaling ECS services is more nuanced than simply adding tasks when CPU is high. Different workloads require different scaling strategies, and the wrong approach can lead to either over-provisioning (wasting money) or under-provisioning (degrading performance). Here is how to implement scaling that matches your actual traffic patterns.'
        ),
        h3('Target Tracking Scaling'),
        p(
          'Target tracking is the simplest and most effective scaling policy for most workloads. You specify a target value for a metric, and ECS automatically adjusts the task count to maintain that target.'
        ),
        code(
          'typescript',
          `// CDK auto-scaling configuration
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as appscaling from 'aws-cdk-lib/aws-applicationautoscaling'

const scaling = service.autoScaleTaskCount({
  minCapacity: 2,
  maxCapacity: 20,
})

// Scale based on CPU utilization
scaling.scaleOnCpuUtilization('CpuScaling', {
  targetUtilizationPercent: 60,
  scaleInCooldown: Duration.seconds(300),
  scaleOutCooldown: Duration.seconds(60),
})

// Scale based on request count per target
scaling.scaleOnRequestCount('RequestScaling', {
  requestsPerTarget: 1000,
  targetGroup: albTargetGroup,
})

// Scale based on custom metric (e.g., SQS queue depth)
scaling.scaleToTrackCustomMetric('QueueScaling', {
  metric: queueDepthMetric,
  targetValue: 100,
  scaleInCooldown: Duration.seconds(300),
  scaleOutCooldown: Duration.seconds(30),
})`,
          'scaling.ts'
        ),
        h3('Scheduled Scaling for Predictable Patterns'),
        p(
          'If your traffic has predictable patterns — like a trading platform that sees peak volume during market hours — scheduled scaling pre-warms your infrastructure before the load arrives.'
        ),
        code(
          'typescript',
          `// Scale up before market open, down after close
scaling.scaleOnSchedule('MarketOpen', {
  schedule: appscaling.Schedule.cron({ hour: '13', minute: '0' }), // UTC
  minCapacity: 10,
  maxCapacity: 30,
})

scaling.scaleOnSchedule('MarketClose', {
  schedule: appscaling.Schedule.cron({ hour: '21', minute: '30' }), // UTC
  minCapacity: 2,
  maxCapacity: 10,
})`,
          'scheduled-scaling.ts'
        ),
        h3('Best Practices'),
        ...ul([
          'Always set asymmetric cooldowns — scale out fast (60s), scale in slow (300s)',
          'Use Application Auto Scaling with SQS queue depth for worker services',
          'Monitor task startup time and factor it into your scaling response',
          'Set a minimum capacity of 2 across different AZs for high availability',
          'Combine scheduled and target tracking scaling for best results',
          'Use capacity providers to mix Fargate and Fargate Spot for cost savings',
        ]),
        blockquote(
          'The goal of auto-scaling is not just handling peak load — it is also scaling down during quiet periods to save money. Both directions matter equally.'
        ),
      ],
    },
    {
      _id: '2025-18',
      title: 'Modern Frontend Architecture Patterns in 2025',
      slug: { current: 'modern-frontend-architecture-patterns-2025' },
      excerpt:
        'An overview of the frontend architecture patterns that are defining how we build web applications in 2025.',
      publishedAt: '2025-09-23',
      author: 'John Pecson',
      categories: ['Architecture', 'Frontend', 'React'],
      mainImage:
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=400&fit=crop',
      body: [
        h2('The Evolution of Frontend Architecture'),
        p(
          'Frontend architecture has evolved dramatically over the past few years. The rise of server components, streaming SSR, and edge computing has blurred the line between frontend and backend. In 2025, the most effective architectures leverage these capabilities to deliver better performance and developer experience simultaneously.'
        ),
        h3('Server Components as the Default'),
        p(
          'React Server Components have shifted the default from client-rendered to server-rendered. Components that do not need interactivity run on the server, reducing JavaScript bundle size and improving initial load performance. The key architectural decision is now where to place the client boundary.'
        ),
        code(
          'typescript',
          `// Server Component — runs on the server, zero client JS
async function PortfolioSummary({ userId }: { userId: string }) {
  const portfolio = await db.portfolio.findMany({
    where: { userId },
    include: { asset: true },
  })

  const totalValue = portfolio.reduce(
    (sum, h) => sum + h.quantity * h.asset.currentPrice,
    0
  )

  return (
    <section>
      <h2>Portfolio: \${totalValue.toLocaleString()}</h2>
      <AssetTable holdings={portfolio} />
      {/* Client boundary — only this component ships JS */}
      <LivePriceUpdater symbols={portfolio.map(h => h.asset.symbol)} />
    </section>
  )
}`,
          'portfolio-summary.tsx'
        ),
        h3('Architecture Patterns Gaining Traction'),
        ...ul([
          'Islands Architecture — interactive components in a sea of static HTML',
          'Streaming SSR with Suspense boundaries — progressive page rendering',
          'Edge-first rendering — running server components at the CDN edge',
          'Micro-frontends with Module Federation — team-scoped deployable units',
          'Hybrid static/dynamic with Partial Pre-Rendering (PPR)',
        ]),
        h3('State Management in the Server Component Era'),
        p(
          'With server components handling most data fetching, client-side state management has become simpler. The recommendation is to use URL state for shareable state, React context for UI state, and server state tools like TanStack Query only for the truly dynamic client data that needs real-time updates.'
        ),
        blockquote(
          'The best frontend architecture in 2025 is not the most sophisticated — it is the one that ships the least JavaScript while maintaining a great user experience.'
        ),
        p(
          'Whatever patterns you adopt, ensure your architecture supports incremental adoption. Teams that try to rewrite everything at once rarely succeed. Migrate page by page, component by component, and measure the impact at each step.'
        ),
      ],
    },

    // ── October ────────────────────────────────────────────────────────
    {
      _id: '2025-19',
      title: 'Building DeFi Interfaces with React',
      slug: { current: 'building-defi-interfaces-with-react' },
      excerpt:
        'How to build user-friendly DeFi interfaces that handle wallet connections, token approvals, and transaction lifecycle.',
      publishedAt: '2025-10-06',
      author: 'John Pecson',
      categories: ['DeFi', 'React', 'Web3'],
      mainImage:
        'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop',
      body: [
        h2('Making DeFi Accessible'),
        p(
          'Decentralized Finance has incredible potential, but its interfaces often alienate mainstream users. Building a great DeFi interface means abstracting blockchain complexity while maintaining transparency about what is happening on-chain. Here is how I approach DeFi frontend development using React and modern Web3 libraries.'
        ),
        h3('Wallet Connection with wagmi'),
        p(
          'The wagmi library has become the standard for React-based wallet connections. It provides hooks for every common Web3 operation and handles the complexity of multi-wallet and multi-chain support.'
        ),
        code(
          'typescript',
          `'use client'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'

function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span>{balance?.formatted} {balance?.symbol}</span>
        <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}`,
          'wallet-button.tsx'
        ),
        h3('Token Swap Interface'),
        p(
          'A token swap is the most common DeFi interaction. The interface must handle token selection, balance checks, price quotes, slippage settings, and the multi-step approval-then-swap flow that is unique to ERC-20 tokens.'
        ),
        h3('Transaction Lifecycle UX'),
        ...ol([
          'User initiates action — show confirmation dialog with estimated gas and output',
          'Wallet approval — display a waiting state while the user confirms in their wallet',
          'Transaction pending — show a progress indicator with the transaction hash',
          'Transaction confirmed — update balances and show a success state with a block explorer link',
          'Transaction failed — display a clear error message with retry option',
        ]),
        blockquote(
          'Every DeFi transaction has at least three waiting states. Handle each one explicitly and the user will never feel lost.'
        ),
        p(
          'Error handling deserves special attention in DeFi interfaces. Users need to understand why a transaction failed — was it slippage, insufficient gas, or a smart contract revert? Map common error codes to human-readable messages and always provide an actionable next step.'
        ),
      ],
    },
    {
      _id: '2025-20',
      title: 'Advanced Redis Patterns for Real-Time Applications',
      slug: { current: 'advanced-redis-patterns-real-time-applications' },
      excerpt:
        'Leveraging Redis data structures and features for building high-performance real-time application features.',
      publishedAt: '2025-10-21',
      author: 'John Pecson',
      categories: ['Redis', 'Real-time', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      body: [
        h2('Redis Beyond Simple Caching'),
        p(
          'Redis is commonly used as a simple key-value cache, but its rich data structures make it incredibly powerful for real-time application features. Sorted sets, streams, Lua scripting, and pub/sub enable use cases that would be complex and slow with traditional databases.'
        ),
        h3('Real-Time Leaderboards with Sorted Sets'),
        p(
          'Sorted sets are perfect for leaderboards because they maintain order automatically. Adding, updating, and querying rankings are all O(log N) operations, making them fast even with millions of entries.'
        ),
        code(
          'typescript',
          `@Injectable()
export class LeaderboardService {
  constructor(private redis: RedisService) {}

  async updateScore(userId: string, score: number): Promise<void> {
    await this.redis.zadd('leaderboard:daily', score, userId)
  }

  async getTopTraders(count: number): Promise<LeaderboardEntry[]> {
    // Get top N with scores, highest first
    const results = await this.redis.zrevrange(
      'leaderboard:daily', 0, count - 1, 'WITHSCORES'
    )

    const entries: LeaderboardEntry[] = []
    for (let i = 0; i < results.length; i += 2) {
      entries.push({
        userId: results[i],
        score: parseFloat(results[i + 1]),
        rank: i / 2 + 1,
      })
    }
    return entries
  }

  async getUserRank(userId: string): Promise<number | null> {
    const rank = await this.redis.zrevrank('leaderboard:daily', userId)
    return rank !== null ? rank + 1 : null
  }
}`,
          'leaderboard.service.ts'
        ),
        h3('Rate Limiting with Sliding Windows'),
        p(
          'Redis sorted sets also enable precise sliding-window rate limiting, which is more accurate than fixed-window approaches.'
        ),
        code(
          'typescript',
          `async function slidingWindowRateLimit(
  redis: Redis,
  key: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  const now = Date.now()
  const windowStart = now - windowMs

  const pipeline = redis.pipeline()
  pipeline.zremrangebyscore(key, 0, windowStart) // Remove expired
  pipeline.zadd(key, now, \`\${now}-\${Math.random()}\`) // Add current
  pipeline.zcard(key) // Count in window
  pipeline.pexpire(key, windowMs) // Set TTL

  const results = await pipeline.exec()
  const count = results?.[2]?.[1] as number

  return count <= limit
}`,
          'rate-limiter.ts'
        ),
        h3('More Redis Patterns'),
        ...ul([
          'Redis Streams for event sourcing and message queues with consumer groups',
          'Pub/Sub for real-time notifications across distributed services',
          'Lua scripts for atomic multi-step operations',
          'HyperLogLog for approximate unique counting at massive scale',
          'Geospatial indexes for location-based queries',
        ]),
        blockquote(
          'Redis is not a database replacement — it is a performance multiplier. Use it for hot data paths where speed is critical, and keep your durable storage as the source of truth.'
        ),
      ],
    },

    // ── November ───────────────────────────────────────────────────────
    {
      _id: '2025-21',
      title: 'Next.js 15 Performance Optimization Guide',
      slug: { current: 'nextjs-15-performance-optimization-guide' },
      excerpt:
        'Practical techniques for maximizing the performance of Next.js 15 applications in production.',
      publishedAt: '2025-11-05',
      author: 'John Pecson',
      categories: ['Next.js', 'Performance', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      body: [
        h2('Performance That Matters'),
        p(
          'Next.js 15 provides powerful performance primitives, but they need to be used intentionally. Partial Pre-Rendering, streaming, server components, and the new caching model all contribute to performance — but misconfiguration can negate their benefits. Here is a systematic approach to optimizing Next.js 15 applications.'
        ),
        h3('Minimize Client JavaScript'),
        p(
          'The single most impactful optimization is reducing the amount of JavaScript shipped to the browser. Server Components make this possible by keeping data-fetching and rendering logic on the server. Audit your "use client" directives and push the client boundary as deep as possible in your component tree.'
        ),
        code(
          'typescript',
          `// Bad: Entire page is a client component
'use client'
export default function DashboardPage() {
  const [data, setData] = useState(null)
  useEffect(() => { fetchData().then(setData) }, [])
  return <Dashboard data={data} />
}

// Good: Server component with minimal client islands
export default async function DashboardPage() {
  const data = await fetchDashboardData()
  return (
    <div>
      <DashboardHeader stats={data.stats} />       {/* Server */}
      <DashboardCharts data={data.charts} />        {/* Server */}
      <LiveActivityFeed />                           {/* Client — only this ships JS */}
    </div>
  )
}`,
          'dashboard-optimization.tsx'
        ),
        h3('Image Optimization'),
        p(
          'Images are typically the largest assets on a page. Next.js Image component handles responsive sizing, lazy loading, and format conversion. For external images, use a CDN like ImageKit or Cloudinary with automatic WebP/AVIF conversion.'
        ),
        h3('Key Optimization Checklist'),
        ...ul([
          'Audit and minimize "use client" boundaries',
          'Use dynamic() imports for heavy client components below the fold',
          'Enable PPR for pages with mixed static and dynamic content',
          'Implement proper Suspense boundaries for streaming SSR',
          'Use next/image with width, height, and priority for LCP images',
          'Configure Cache-Control headers for static assets (1 year immutable)',
          'Monitor Core Web Vitals with next/web-vitals or Vercel Analytics',
        ]),
        blockquote(
          'Measure before you optimize. Use Lighthouse, WebPageTest, and real user monitoring to identify actual bottlenecks before applying fixes.'
        ),
        p(
          'Performance is a feature, not a technical detail. A 100ms improvement in Time to Interactive can measurably improve conversion rates and user satisfaction. Make performance budgets part of your CI pipeline.'
        ),
      ],
    },
    {
      _id: '2025-22',
      title: 'Node.js Memory Management and Profiling',
      slug: { current: 'nodejs-memory-management-and-profiling' },
      excerpt:
        'Understanding V8 memory management and using profiling tools to find and fix memory leaks in Node.js applications.',
      publishedAt: '2025-11-20',
      author: 'John Pecson',
      categories: ['Node.js', 'Performance', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop',
      body: [
        h2('Understanding V8 Memory in Node.js'),
        p(
          'Memory leaks in Node.js applications are insidious — they build up slowly, cause garbage collection pauses, and eventually crash the process with an out-of-memory error. Understanding how V8 manages memory and knowing how to profile it is essential for building reliable backend services.'
        ),
        h3('V8 Memory Layout'),
        p(
          'V8 divides the heap into several spaces: New Space (young generation) for short-lived objects, Old Space for objects that survived garbage collection, and Large Object Space for objects exceeding the size threshold. Most memory leaks involve objects that accumulate in Old Space because they are inadvertently kept alive by references.'
        ),
        h3('Common Leak Patterns'),
        ...ul([
          'Unbounded caches — Maps or objects that grow without eviction',
          'Event listener accumulation — adding listeners without removing them',
          'Closures capturing large scopes — functions retaining references to outer variables',
          'Global variable accumulation — storing request-scoped data globally',
          'Uncleared timers and intervals — setInterval callbacks holding references',
        ]),
        h3('Profiling with Node.js Inspector'),
        p(
          'Node.js has built-in profiling capabilities through the V8 inspector protocol. You can take heap snapshots, record allocation timelines, and compare memory states to identify leaks.'
        ),
        code(
          'typescript',
          `// Programmatic heap snapshot for production debugging
import v8 from 'v8'
import fs from 'fs'

function takeHeapSnapshot(): string {
  const snapshotStream = v8.writeHeapSnapshot()
  console.log(\`Heap snapshot written to: \${snapshotStream}\`)
  return snapshotStream
}

// Expose via admin endpoint (secured)
app.get('/admin/heap-snapshot', authMiddleware, (req, res) => {
  const path = takeHeapSnapshot()
  res.download(path)
})

// Monitor memory usage in production
setInterval(() => {
  const usage = process.memoryUsage()
  metrics.gauge('node.heap.used', usage.heapUsed)
  metrics.gauge('node.heap.total', usage.heapTotal)
  metrics.gauge('node.rss', usage.rss)
  metrics.gauge('node.external', usage.external)

  if (usage.heapUsed > 1.5 * 1024 * 1024 * 1024) { // 1.5GB threshold
    logger.warn('High memory usage detected', { usage })
  }
}, 30000)`,
          'memory-monitoring.ts'
        ),
        h3('Fixing Common Leaks'),
        code(
          'typescript',
          `// Bad: Unbounded cache
const cache = new Map<string, any>()
function getData(key: string) {
  if (!cache.has(key)) {
    cache.set(key, fetchExpensiveData(key)) // Never evicted!
  }
  return cache.get(key)
}

// Good: LRU cache with size limit
import { LRUCache } from 'lru-cache'
const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 10, // 10 minute TTL
})`,
          'fix-leak.ts'
        ),
        blockquote(
          'The best memory leak is the one you prevent. Use WeakMap, WeakRef, and bounded caches by default, and memory leaks become rare events rather than recurring nightmares.'
        ),
      ],
    },

    // ── December ───────────────────────────────────────────────────────
    {
      _id: '2025-23',
      title: 'Full-Stack Architecture Lessons from 2025',
      slug: { current: 'full-stack-architecture-lessons-2025' },
      excerpt:
        'Reflecting on the architectural decisions that worked (and did not) across multiple full-stack projects this year.',
      publishedAt: '2025-12-03',
      author: 'John Pecson',
      categories: ['Architecture', 'Full-Stack', 'Review'],
      mainImage:
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
      body: [
        h2('A Year of Building and Learning'),
        p(
          'As 2025 winds down, I want to reflect on the architectural decisions that shaped my projects this year. Some were great from the start, others required mid-course corrections, and a few taught expensive lessons. Here are the patterns and principles that stood the test of real-world production workloads.'
        ),
        h3('What Worked Well'),
        ...ul([
          'Server Components by default — reduced client bundle sizes by 40-60% across all Next.js projects',
          'Event-driven microservices — decoupled teams shipped independently without breaking each other',
          'TypeScript everywhere — shared type definitions between frontend and backend caught countless bugs',
          'Infrastructure as Code with CDK — reproducible environments eliminated configuration drift',
          'Monorepo with Turborepo — shared packages and consistent tooling boosted productivity',
        ]),
        h3('What I Would Do Differently'),
        ...ul([
          'Started with a simpler database architecture — polyglot persistence added complexity before we needed it',
          'Invested in observability earlier — we spent too long debugging without proper distributed tracing',
          'Defined API contracts with OpenAPI first — retrofitting specs to existing APIs was painful',
          'Set up performance budgets from day one — catching regressions early is cheaper than fixing them later',
        ]),
        h3('The Architecture That Worked Best'),
        p(
          'The most successful architecture I shipped this year was a Next.js 15 frontend with NestJS backend, PostgreSQL for transactional data, Redis for caching and real-time features, and SQS/SNS for async workflows. It was not the most innovative stack, but it was the most productive.'
        ),
        code(
          'typescript',
          `// The "boring" architecture that ships
const stack = {
  frontend: 'Next.js 15 with App Router and Server Components',
  backend: 'NestJS with TypeORM and class-validator',
  database: 'PostgreSQL 16 with PgBouncer',
  cache: 'Redis 7 with Sentinel for HA',
  queue: 'SQS + SNS for async workflows',
  infra: 'AWS CDK with ECS Fargate',
  ci: 'GitHub Actions with Turborepo remote caching',
  monitoring: 'Datadog APM + CloudWatch',
}`,
          'architecture.ts'
        ),
        blockquote(
          'The best architecture is the one your team can understand, maintain, and iterate on quickly. Sophistication should serve the product, not the engineer\'s resume.'
        ),
        p(
          'Looking ahead to 2026, I am most excited about edge computing becoming practical for data-intensive applications, AI-assisted development tools maturing, and the continued convergence of frontend and backend paradigms.'
        ),
      ],
    },
    {
      _id: '2025-24',
      title: 'Tech Predictions and Trends for 2026',
      slug: { current: 'tech-predictions-and-trends-2026' },
      excerpt:
        'My predictions for the technologies, frameworks, and patterns that will define web development in 2026.',
      publishedAt: '2025-12-18',
      author: 'John Pecson',
      categories: ['Trends', 'Web Development', 'Review'],
      mainImage:
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
      body: [
        h2('Looking Ahead to 2026'),
        p(
          'Predicting technology trends is always risky, but patterns from 2025 point clearly toward several major shifts. Based on what I have seen in production codebases, open-source communities, and the broader industry, here are my predictions for what will matter most in 2026.'
        ),
        h3('AI-Augmented Development Becomes Standard'),
        p(
          'AI coding assistants moved from novelty to necessity in 2025. In 2026, I expect AI to be deeply integrated into CI/CD pipelines — automated code review, test generation, and performance optimization will become standard. The developers who thrive will be those who learn to collaborate effectively with AI tools.'
        ),
        h3('Key Predictions'),
        ...ol([
          'Edge computing goes mainstream — Cloudflare Workers and Vercel Edge Functions handle real database queries, not just static content',
          'TypeScript becomes the undisputed default — the ecosystem fully commits, with major libraries dropping JavaScript-first authoring',
          'React Server Components mature — the community builds established patterns and the learning curve flattens',
          'Web3 finds practical use cases — beyond speculation, blockchain-verified credentials and supply chain tracking gain traction',
          'Monorepo tooling reaches parity with single-repo DX — Turborepo, Nx, and Moon make monorepos genuinely easy',
          'Observability-driven development — OpenTelemetry becomes as standard as testing frameworks',
        ]),
        h3('What Will Fade'),
        ...ul([
          'Client-side-only SPAs — server rendering is now the default for SEO-critical applications',
          'Manual Webpack configuration — Turbopack, Vite, and framework-managed bundling dominate',
          'Redux for new projects — server state libraries and built-in React features cover most use cases',
          'Separate REST and GraphQL debates — tRPC and server actions blur the lines',
        ]),
        blockquote(
          'The most important skill for 2026 is not learning a new framework — it is developing the judgment to choose the right tool for each problem.'
        ),
        p(
          'Whatever trends emerge, the fundamentals remain unchanged: understand your users, ship iteratively, measure what matters, and keep learning. The tools are just a means to that end.'
        ),
      ],
    },

    // ── Additional Posts ───────────────────────────────────────────────
    {
      _id: '2025-25',
      title: 'Implementing OAuth 2.0 with NestJS',
      slug: { current: 'implementing-oauth-2-with-nestjs' },
      excerpt:
        'A step-by-step guide to implementing OAuth 2.0 authentication flows in NestJS with Passport.js.',
      publishedAt: '2025-03-28',
      author: 'John Pecson',
      categories: ['NestJS', 'Security', 'Backend'],
      mainImage:
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
      body: [
        h2('Secure Authentication with OAuth 2.0'),
        p(
          'OAuth 2.0 is the industry standard for authorization, and implementing it correctly is critical for application security. NestJS combined with Passport.js provides an elegant, modular approach to handling OAuth flows including authorization code, refresh tokens, and social login providers.'
        ),
        h3('Setting Up Passport Strategies'),
        p(
          'Passport.js strategies encapsulate the authentication logic for each provider. In NestJS, these are wrapped in Guards that integrate seamlessly with the request pipeline.'
        ),
        code(
          'typescript',
          `import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    const user = await this.authService.findOrCreateUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos[0]?.value,
      provider: 'google',
      providerId: profile.id,
    })
    done(null, user)
  }
}`,
          'google.strategy.ts'
        ),
        h3('JWT Token Management'),
        p(
          'After OAuth authentication, issue your own JWT tokens for subsequent API requests. Use short-lived access tokens (15 minutes) and long-lived refresh tokens (7 days) stored in HTTP-only cookies.'
        ),
        code(
          'typescript',
          `@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateTokens(user: User): TokenPair {
    const payload = { sub: user.id, email: user.email, roles: user.roles }

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(
        { sub: user.id, type: 'refresh' },
        { expiresIn: '7d' },
      ),
    }
  }

  setTokenCookies(res: Response, tokens: TokenPair): void {
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    })

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
  }
}`,
          'token.service.ts'
        ),
        h3('Security Best Practices'),
        ...ul([
          'Always use HTTPS in production — OAuth tokens must never travel over plain HTTP',
          'Store tokens in HTTP-only cookies, not localStorage, to prevent XSS attacks',
          'Implement CSRF protection with SameSite cookies and anti-CSRF tokens',
          'Validate and rotate refresh tokens on every use to prevent token theft',
          'Use PKCE (Proof Key for Code Exchange) for public clients',
        ]),
        blockquote(
          'Authentication is not a feature to get working and forget. It requires ongoing attention to security advisories, token rotation, and session management.'
        ),
      ],
    },
    {
      _id: '2025-26',
      title: 'React Query and Server State Management',
      slug: { current: 'react-query-server-state-management' },
      excerpt:
        'Mastering TanStack Query (React Query) for server state management, caching, and optimistic updates.',
      publishedAt: '2025-06-28',
      author: 'John Pecson',
      categories: ['React', 'State Management', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      body: [
        h2('Server State Is Not Client State'),
        p(
          'One of the biggest mental model shifts in modern React development is recognizing that server state and client state are fundamentally different. Server state is asynchronous, shared across users, and can become stale. Client state is synchronous, local, and always up-to-date. TanStack Query (formerly React Query) was built specifically for managing server state.'
        ),
        h3('Basic Query Patterns'),
        p(
          'TanStack Query provides hooks that handle fetching, caching, background refetching, and stale-while-revalidate patterns automatically. The key is defining good query keys and understanding the stale time configuration.'
        ),
        code(
          'typescript',
          `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Fetch portfolio data with automatic caching
function usePortfolio(userId: string) {
  return useQuery({
    queryKey: ['portfolio', userId],
    queryFn: () => api.getPortfolio(userId),
    staleTime: 30 * 1000, // Consider fresh for 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  })
}

// Mutation with optimistic update
function useAddHolding() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (holding: NewHolding) => api.addHolding(holding),
    onMutate: async (newHolding) => {
      await queryClient.cancelQueries({ queryKey: ['portfolio'] })
      const previous = queryClient.getQueryData(['portfolio'])

      queryClient.setQueryData(['portfolio'], (old: Portfolio) => ({
        ...old,
        holdings: [...old.holdings, { ...newHolding, id: 'temp' }],
      }))

      return { previous }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['portfolio'], context?.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    },
  })
}`,
          'portfolio-queries.ts'
        ),
        h3('Advanced Patterns'),
        ...ul([
          'Dependent queries — fetch data that depends on the result of another query',
          'Infinite queries — paginated lists with useInfiniteQuery',
          'Prefetching — warm the cache before navigation for instant page loads',
          'Placeholder data — show stale data immediately while fetching fresh data',
          'Query invalidation cascades — invalidate related queries when mutations succeed',
        ]),
        h3('When to Use React Query vs Server Components'),
        p(
          'In a Next.js 15 application, server components handle initial data loading perfectly. TanStack Query shines for client-side data that needs real-time updates, user-triggered mutations, and optimistic UI. Use server components for the initial render and React Query for subsequent interactions.'
        ),
        blockquote(
          'The goal is not to eliminate all loading states — it is to make them as short and rare as possible. Stale-while-revalidate is the best user experience pattern for most data.'
        ),
        p(
          'Combining server components for initial data with TanStack Query for client mutations gives you the best of both worlds: fast initial loads with zero client JavaScript for read paths, and powerful mutation handling for write paths.'
        ),
      ],
    },
    {
      _id: '2025-27',
      title: 'Docker Compose for Development Environments',
      slug: { current: 'docker-compose-for-development-environments' },
      excerpt:
        'Creating productive local development environments with Docker Compose that mirror production infrastructure.',
      publishedAt: '2025-09-28',
      author: 'John Pecson',
      categories: ['Docker', 'DevOps', 'Development'],
      mainImage:
        'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
      body: [
        h2('Consistent Development Environments'),
        p(
          'Every developer has experienced the "works on my machine" problem. Docker Compose solves this by defining your entire development infrastructure — databases, caches, message queues, and services — in a single file that works identically on every machine. Here is how I set up productive development environments for complex applications.'
        ),
        h3('A Complete Development Stack'),
        code(
          'yaml',
          `version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: empire_crypto
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: devpassword
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru

  localstack:
    image: localstack/localstack
    ports:
      - '4566:4566'
    environment:
      SERVICES: sqs,sns,s3
      DEFAULT_REGION: us-east-1
    volumes:
      - ./scripts/localstack-init.sh:/etc/localstack/init/ready.d/init.sh

  mailhog:
    image: mailhog/mailhog
    ports:
      - '1025:1025'  # SMTP
      - '8025:8025'  # Web UI

volumes:
  postgres_data:`,
          'docker-compose.yml'
        ),
        h3('Development Workflow Tips'),
        ...ul([
          'Use named volumes for database data so it persists between restarts',
          'Mount init scripts to seed databases automatically on first run',
          'Use LocalStack to emulate AWS services locally (SQS, SNS, S3)',
          'Include MailHog for testing email flows without sending real emails',
          'Add health checks so dependent services wait for databases to be ready',
        ]),
        h3('Making It Fast'),
        p(
          'Docker Compose can feel slow if not configured properly. Use volume mounts carefully — mounting node_modules from the host into the container causes significant performance issues on macOS. Instead, install dependencies inside the container and use a named volume for node_modules.'
        ),
        code(
          'yaml',
          `# Optimized service definition for Node.js development
  api:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - .:/app
      - node_modules:/app/node_modules  # Named volume, not host mount
    ports:
      - '3001:3001'
    environment:
      DATABASE_URL: postgresql://dev:devpassword@postgres:5432/empire_crypto
      REDIS_URL: redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started`,
          'docker-compose.yml'
        ),
        blockquote(
          'A great development environment is invisible. Developers should run one command and have everything they need running within seconds.'
        ),
        p(
          'Document the setup process in your project README and include a Makefile or npm scripts for common operations. The faster a new team member can start developing, the more productive your team will be.'
        ),
      ],
    },
    {
      _id: '2025-28',
      title: 'Building Progressive Web Apps with Next.js',
      slug: { current: 'building-progressive-web-apps-with-nextjs' },
      excerpt:
        'How to add PWA capabilities to Next.js applications including service workers, offline support, and install prompts.',
      publishedAt: '2025-11-28',
      author: 'John Pecson',
      categories: ['PWA', 'Next.js', 'Frontend'],
      mainImage:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
      body: [
        h2('Progressive Web Apps in the App Router Era'),
        p(
          'Progressive Web Apps combine the reach of web applications with the capabilities of native apps. With Next.js 15 and the App Router, building PWAs requires a slightly different approach than the traditional Pages Router setup. Here is how to add PWA capabilities to a modern Next.js application.'
        ),
        h3('Web App Manifest'),
        p(
          'The manifest file defines how your app appears when installed on a device. Next.js 15 supports generating the manifest through the App Router metadata API.'
        ),
        code(
          'typescript',
          `// app/manifest.ts
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Empire Crypto Trading',
    short_name: 'Empire Crypto',
    description: 'Real-time cryptocurrency trading platform',
    start_url: '/',
    display: 'standalone',
    background_color: '#121212',
    theme_color: '#FF5C28',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}`,
          'app/manifest.ts'
        ),
        h3('Service Worker with next-pwa'),
        p(
          'The next-pwa package integrates Workbox-powered service workers into Next.js. It handles caching strategies, offline fallbacks, and background sync automatically.'
        ),
        code(
          'typescript',
          `// next.config.mjs
import withPWA from 'next-pwa'

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\\/\\/api\\.empire-crypto\\.com\\/v1\\/prices/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'price-cache',
        expiration: { maxEntries: 100, maxAgeSeconds: 60 },
      },
    },
    {
      urlPattern: /^https:\\/\\/images\\.unsplash\\.com\\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
  ],
})

export default config({
  // ... other Next.js config
})`,
          'next.config.mjs'
        ),
        h3('PWA Capabilities Checklist'),
        ...ul([
          'Web App Manifest with icons for all device sizes',
          'Service worker for offline support and caching',
          'HTTPS required in production (localhost exempt for development)',
          'Responsive design that works on all screen sizes',
          'Install prompt handling with beforeinstallprompt event',
          'Push notifications for real-time alerts (optional)',
          'Background sync for offline form submissions',
        ]),
        h3('Offline Strategy for Trading Apps'),
        p(
          'For a trading application, complete offline functionality is not realistic — users need live data to make decisions. Instead, I implement a "graceful offline" approach: show the last known portfolio state, queue any non-critical actions for sync, and display a clear offline indicator.'
        ),
        blockquote(
          'A PWA does not need to work fully offline to be valuable. Even basic install-to-homescreen and fast loading from cache provide a significantly better mobile experience.'
        ),
        p(
          'Test your PWA thoroughly using Lighthouse PWA audits and real device testing. The Chrome DevTools Application panel lets you simulate offline mode, test push notifications, and inspect service worker behavior.'
        ),
      ],
    },
  ]
}
