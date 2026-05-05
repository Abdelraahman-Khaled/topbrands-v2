import { getPageData } from "@/services/home.service";
import LocalizedLink from "../../components/LocalizedLink";
import Subscribe from "../../components/Subscribe";
import SocialShare from "../components/SocialShare";
import ScrollReveal from "../../components/ScrollReveal";

export default async function BlogDetailPage({ params }) {
  const { slug, locale } = await params;
  const isAr = locale === 'ar';

  // Fetch data to find specific blog
  const data = await getPageData("blogs", locale);
  const blog = data?.blogs?.find(b => b.id.toString() === slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <i className="ri-article-line text-6xl text-gray-300 mb-4"></i>
          <p className="text-xl text-gray-500">{isAr ? "المقال غير موجود" : "Article not found"}</p>
          <LocalizedLink href="/blog" className="mt-4 inline-block text-brand-yellow font-bold hover:underline">
            {isAr ? "العودة للمدونة" : "Back to Blog"}
          </LocalizedLink>
        </div>
      </div>
    );
  }

  const content = blog.contents?.[0]?.content || "";

  return (
    <div className="min-h-screen bg-white">
      {/* Article Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-[#000000] to-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-4 md:mb-6">
            <span className="inline-block px-6 py-2 bg-brand-yellow text-[#000000] rounded-full text-sm font-bold uppercase tracking-wider">
              {blog.category.replace(/_/g, ' ')}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-300">
            <span className="flex items-center gap-2 text-sm sm:text-base">
              <i className="ri-calendar-line text-brand-yellow"></i>
              {new Date(blog.created_at || Date.now()).toLocaleDateString(isAr ? 'ar-SY' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative -mt-6 sm:-mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={blog.photo}
              alt={blog.title}
              className="w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <ScrollReveal delay={0.1}>
        <section className="py-10 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sidebar - Social Share */}
              <div className="hidden lg:block w-16 shrink-0">
                <div className="sticky top-32">
                  <SocialShare title={blog.title} />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <article
                  className="prose prose-lg max-w-none article-content break-words"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Mobile share buttons */}
                <div className="lg:hidden mt-12 py-8 border-t-2 border-[#DEE3EB]">
                  <p className="text-center font-bold mb-6 text-[#000000]">
                    {isAr ? "شارك المقال" : "Share Article"}
                  </p>
                  <div className="flex justify-center">
                    <SocialShare title={blog.title} horizontal={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Newsletter CTA */}
      <ScrollReveal>
        <Subscribe 
          title={isAr ? "لا تفوت أي تحديث" : "Never Miss an Update"} 
          mail={true} 
        />
      </ScrollReveal>

      {/* Custom Styles for Dynamic HTML Content */}
      <style>{`
        .article-content {
          color: #4B4F54;
          font-family: 'Quicksand', sans-serif;
        }
        .article-content h2 {
          color: #000000;
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.3;
        }
        @media (min-width: 768px) {
          .article-content h2 {
            font-size: 2.25rem;
            margin-top: 3.5rem;
            margin-bottom: 1.5rem;
          }
        }
        .article-content h3 {
          color: #000000;
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          font-size: 1.125rem;
        }
        .article-content ul, .article-content ol {
          margin-bottom: 1.5rem;
          padding-inline-start: 1.5rem;
        }
        .article-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }
        .article-content strong {
          color: #000000;
          font-weight: 700;
        }
        .article-content img {
          border-radius: 1rem;
          margin: 2.5rem 0;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
        }
        .article-content blockquote {
          border-inline-start: 4px solid #F7E326;
          padding-inline-start: 1.5rem;
          font-style: italic;
          color: #1a1a1a;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}
