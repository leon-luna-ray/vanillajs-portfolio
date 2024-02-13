export function addSEOTags(title, description, url, imageUrl) {
    // Create meta tags
    const metaTags = [
        { name: 'title', content: title },
        { name: 'description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:image', content: imageUrl },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:title', content: title },
        { property: 'twitter:description', content: description },
        { property: 'twitter:url', content: url },
        { property: 'twitter:image', content: imageUrl }
    ];

    // Append meta tags to the head element
    const head = document.head;
    metaTags.forEach(tag => {
        const metaTag = document.createElement('meta');
        Object.keys(tag).forEach(key => {
            metaTag.setAttribute(key, tag[key]);
        });
        head.appendChild(metaTag);
    });

    // Create canonical link tag
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', url);
    head.appendChild(canonicalLink);
}