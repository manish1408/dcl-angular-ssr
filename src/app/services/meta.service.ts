import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class MetaService {
  // put default values here
  defaultTags = {
    title: 'Default Title',
    description: 'Default Description',
    image: '',
    slug: '',
    twitter_user: '',
    twitter_card: '',
    fb_type: '',
    fb_user: '',
    keywords: '',
  };

  constructor(private meta: Meta, private title: Title) {}

  generateTags(config: any): void {
    // default values
    config = {
      ...this.defaultTags,
      ...config,
    };

    this.title.setTitle(config.title);

    // For google
    this.meta.updateTag({ name: 'title', content: config.title });
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: config.keywords });

    // For twitter
    this.meta.updateTag({ name: 'twitter:card', content: config.twitter_card });
    this.meta.updateTag({ name: 'twitter:site', content: config.twitter_user });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description,
    });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    // For Facebook
    this.meta.updateTag({ property: 'og:type', content: config.fb_user });
    this.meta.updateTag({ property: 'og:site_name', content: config.fb_user });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({
      property: 'og:description',
      content: config.description,
    });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: config.slug });
  }

  resetMeta(): void {
    this.generateTags(this.defaultTags);
  }
}
