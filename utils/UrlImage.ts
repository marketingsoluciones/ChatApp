export const createURL = (slug: string | undefined | null) => {
    if (slug) return `${process.env.NEXT_PUBLIC_BASE_URL}${slug.slice(1, slug.length)}`
}