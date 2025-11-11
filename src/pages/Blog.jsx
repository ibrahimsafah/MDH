import React from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { Button } from '../components/Button.jsx'
import { blogPosts } from '../data/blogPosts.js'

const blogDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-5xl px-6 py-12 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading
            eyebrow="Journal"
            title="Monthly guidance for elevated hardscapes."
            description="Strategy for finding the right contractor, choosing statement pavers, and designing low-impact outdoor systems."
          />
          <Link to="/" className="shrink-0">
            <Button variant="outline">Back to studio</Button>
          </Link>
        </div>

        {blogPosts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-nude/60 bg-white/70 p-10 text-center text-sm text-[color:var(--fg)]/70">
            Fresh stories are in production. Check back soon or <a href="#quote" className="text-olive underline-offset-4 hover:underline">request a consult</a> to chat live.
          </div>
        ) : (
          <div className="space-y-6">
            {blogPosts.map(post => (
              <article
                key={post.id}
                className="rounded-3xl border border-nude/50 bg-white/85 p-6 shadow-mild transition hover:-translate-y-0.5 hover:shadow-deep"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--fg)]/60">
                      <span className="rounded-full bg-olive/10 px-3 py-1 text-[0.7rem] tracking-[0.2em] text-olive">
                        {post.category}
                      </span>
                      <time dateTime={post.date}>{blogDateFormatter.format(new Date(post.date))}</time>
                      <span className="h-1 w-1 rounded-full bg-[color:var(--fg)]/40" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[color:var(--fg)]/80">{post.excerpt}</p>
                  </div>
                  <div className="md:w-56">
                    <Button variant="ghost" className="justify-start px-0 text-olive hover:text-olive/80">
                      Read insights →
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
