import { collection, config, fields, singleton } from '@keystatic/core';

const socialLink = fields.object(
  {
    id: fields.text({ label: 'ID', validation: { isRequired: true } }),
    label: fields.text({ label: 'Label', validation: { isRequired: true } }),
    href: fields.text({ label: 'URL or path' }),
  },
  { label: 'Social link' },
);

const projectFields = {
  title: fields.slug({
    name: {
      label: 'Title',
      validation: { isRequired: true },
    },
  }),
  description: fields.text({
    label: 'Summary',
    multiline: true,
    validation: { isRequired: true },
  }),
  category: fields.select({
    label: 'Category',
    defaultValue: 'personal',
    options: [
      { label: 'Work', value: 'work' },
      { label: 'Personal', value: 'personal' },
    ],
  }),
  personalCategory: fields.select({
    label: 'Personal type',
    defaultValue: 'other',
    description: 'Use "Other" for work projects or uncategorised personal projects.',
    options: [
      { label: 'Cyberdeck', value: 'cyberdeck' },
      { label: 'NAS', value: 'nas' },
      { label: 'Crafts', value: 'crafts' },
      { label: 'Other', value: 'other' },
    ],
  }),
  pubDate: fields.date({
    label: 'Published date',
    defaultValue: { kind: 'today' },
    validation: { isRequired: true },
  }),
  updatedDate: fields.date({ label: 'Updated date' }),
  heroImage: fields.image({
    label: 'Hero image',
    directory: 'src/assets/images/projects',
    publicPath: '../../../assets/images/projects/',
  }),
  tags: fields.array(fields.text({ label: 'Tag' }), {
    label: 'Tags',
    itemLabel: (props) => props.value,
  }),
  featured: fields.checkbox({
    label: 'Featured',
    description: 'Show this more prominently on listing pages.',
  }),
  content: fields.markdoc({
    label: 'Case study',
    options: {
      image: {
        directory: 'src/assets/images/projects',
        publicPath: '../../../assets/images/projects/',
      },
    },
  }),
};

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: 'Maddy Michaela Portfolio' },
    navigation: {
      Content: ['workProjects', 'personalProjects'],
      Settings: ['site'],
    },
  },
  collections: {
    workProjects: collection({
      label: 'Work projects',
      slugField: 'title',
      path: 'src/content/projects/work/*',
      entryLayout: 'content',
      format: { data: 'yaml', contentField: 'content' },
      columns: ['title', 'category', 'personalCategory', 'pubDate', 'featured'],
      schema: projectFields,
    }),
    personalProjects: collection({
      label: 'Personal projects',
      slugField: 'title',
      path: 'src/content/projects/personal/*',
      entryLayout: 'content',
      format: { data: 'yaml', contentField: 'content' },
      columns: ['title', 'category', 'personalCategory', 'pubDate', 'featured'],
      schema: projectFields,
    }),
  },
  singletons: {
    site: singleton({
      label: 'Site settings',
      path: 'src/site-config',
      format: 'yaml',
      schema: {
        author: fields.object(
          {
            name: fields.text({ label: 'Name', validation: { isRequired: true } }),
            role: fields.text({ label: 'Role', validation: { isRequired: true } }),
            bio: fields.text({ label: 'Bio', multiline: true, validation: { isRequired: true } }),
            location: fields.text({ label: 'Location' }),
          },
          { label: 'Author' },
        ),
        social: fields.array(socialLink, {
          label: 'Social links',
          itemLabel: (props) => props.fields.label.value || props.fields.id.value,
        }),
      },
    }),
  },
});
