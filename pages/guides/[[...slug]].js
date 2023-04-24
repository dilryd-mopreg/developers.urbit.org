import Head from "next/head";
import Link from "next/link";
import Meta from "../../components/Meta";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import CardText from "../../components/CardText";
import ContentArea from "../../components/ContentArea";
import Sidebar from "../../components/Sidebar";
import TallCard from "../../components/TallCard";
import Pagination from "../../components/Pagination";
import {
  Container,
  Section,
  SingleColumn,
  TwoUp,
  Markdown,
  RenderTree,
  getPage,
  getPreviousPost,
  getNextPost,
} from "@urbit/foundation-design-system";
import { Comms, Ringsig, Squad } from "../../components/icons";
import guidesTree from "../../cache/guides.json";
import { join } from "path";
import { pair } from '../../lib/util';

export default function GuidePage({
  search,
  posts,
  data,
  markdown,
  params,
  previousPost,
  nextPost,
}) {
  if (!params.slug) {
    return <Landing search={search} posts={posts} />;
  }
  return (
    <>
      <Head>
        <title>{data.title} • Guides • developers.urbit.org</title>
        {Meta(data)}
      </Head>
      <div className="flex h-screen min-h-screen w-screen sidebar">
        <Sidebar search={search}>
          <RenderTree root="/guides" posts={posts.children} />
        </Sidebar>
        <ContentArea
          breadcrumbs={breadcrumbs(posts, params.slug?.slice(0, -1) || "")}
          title={data.title}
          search={search}
          section="Guides"
          params={params}
        >
          <div className="markdown technical">
            <Markdown.render content={JSON.parse(markdown)} />
          </div>
          <div className="flex justify-between mt-16">
            {previousPost === null ? (
              <div className={""} />
            ) : (
              <Pagination
                previous
                title="Previous Post"
                post={previousPost}
                className=""
                section={join("guides", params.slug?.slice(0, -1).join("/"))}
              />
            )}
            {nextPost === null ? (
              <div className={""} />
            ) : (
              <Pagination
                next
                title="Next Post"
                post={nextPost}
                className=""
                section={join("guides", params.slug?.slice(0, -1).join("/"))}
              />
            )}
          </div>
          <div className="flex justify-between items-center mt-16">
            <a
              className="font-semibold rounded-xl block p-2 text-wall-400 hover:text-green-400"
              target="_blank"
              href={`https://github.com/urbit/developers.urbit.org/blob/main/content/guides/${params.slug?.join("/") || "_index"
                }.md`}
            >
              Edit this page on GitHub
            </a>
            <p className="font-semibold block p-2 text-wall-400">Last modified {data.lastModified}</p>
          </div>
        </ContentArea>
      </div>
    </>
  );
}

const breadcrumbs = (posts, paths) => {
  const results = [<Link href="/guides">Guides</Link>];
  let thisLink = "/guides";
  for (const path of paths) {
    posts = posts.children[path];
    thisLink = join(thisLink, path);
    results.push(
      <span className="px-1">/</span>,
      <Link href={thisLink}>{posts.title}</Link>
    );
  }
  return results;
};

function Landing({ search, posts }) {
  const post = {
    title: "Guides",
    description:
      "Everything you need to know to start building applications on Urbit.",
  };

  const additionalGuides = pair([
    ...posts.children.additional.pages,
    ...Object.entries(posts.children.additional.children)
      .filter(([, e]) => e !== "pages").map(([k, v]) => ({ ...v, ...{ slug: k } }))]
    .sort((a, b) => {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    })
  );

  return (
    <Container>
      <Head>
        <title>Guides • developers.urbit.org</title>
        {Meta(post)}
      </Head>
      <Header search={search} />
      <SingleColumn>
        <Section>
          <h1>Guides</h1>
        </Section>
        <Section short>
          <h2 className="pt-12">Quickstart: Lightning Tutorials</h2>
          <p className="pt-4">
            Build an application on Urbit in 15 minutes with these instant
            application guides.
          </p>
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-8 pt-12">
            <Card
              icon={<Squad />}
              title="Groups Application"
              text="Build an app to create public or private groups"
              className="basis-1/2"
              href="/guides/quickstart/groups-guide"
            />
            <Card
              icon={<Comms />}
              title="Encrypted Chat Application"
              text="Build your own secure comms tool"
              className="basis-1/2"
              href="/guides/quickstart/chat-guide"
            />
          </div>
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-8 pt-6 pb-12">
            <Card
              icon={<Ringsig />}
              title="Ring Signature Voting App"
              text="Build an anonymous voting app for groups"
              className="basis-1/2"
              href="/guides/quickstart/voting-guide"
            />
            <div className="basis-1/2" />
          </div>
        </Section>
        <Section short className="space-y-6">
          <h2>Core Curriculum</h2>
          <p>
            Learn to code and how to build applications on Urbit.
          </p>
          <TwoUp>
            <TallCard
              title="Environment Setup"
              description="Learn how to get your urbit development environment configured"
              callout="View Guide"
              href="/guides/core/environment"
              image="https://storage.googleapis.com/media.urbit.org/developers/card-images/environment-setup.svg"
              className="h-full"
            />
            <TallCard
              title="Hoon Guide"
              description="Learn the fundamentals of the Hoon programming language"
              callout="View Guide"
              href="/guides/core/hoon-guide"
              image="https://storage.googleapis.com/media.urbit.org/developers/card-images/hoon-guide.svg"
              className="h-full"
            />
          </TwoUp>
          <TwoUp className="!mt-0">
            <TallCard
              title="App Guide"
              description="Learn how to build Urbit userspace applications by writing your own Gall agents"
              callout="View Guide"
              href="/guides/core/app-guide"
              image="https://storage.googleapis.com/media.urbit.org/developers/card-images/app-guide.svg"
              className="h-full"
            />
            <TallCard
              title="App Guide II"
              description="Learn how to create Gall agents and integrate them into a React front-end"
              callout="View Guide"
              href="/guides/core/app-guide-2"
              image="https://storage.googleapis.com/media.urbit.org/developers/card-images/app-guide-2.svg"
              className="h-full"
            />
          </TwoUp>
        </Section>

        <Section short>
          <h2 className="my-12">Additional Guides</h2>
          {additionalGuides.map((pair) => {
            return <TwoUp>
              {pair.map((guide) => {
                return <CardText
                  title={guide.title}
                  text={guide.description}
                  className="basis-1/2"
                  href={`/guides/additional/${guide.slug}`}
                />
              })}
            </TwoUp>
          })}
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps({ params }) {
  let posts = guidesTree;

  const { data, content } = getPage(
    join(process.cwd(), "content/guides", params.slug?.join("/") || "/"), true
  );

  const previousPost =
    getPreviousPost(
      params.slug?.slice(-1).join("") || "guides",
      ["title", "slug", "weight"],
      join("guides", params.slug?.slice(0, -1).join("/") || "/"),
      "weight"
    ) || null;

  const nextPost =
    getNextPost(
      params.slug?.slice(-1).join("") || "guides",
      ["title", "slug", "weight"],
      join("guides", params.slug?.slice(0, -1).join("/") || "/"),
      "weight"
    ) || null;

  const markdown = JSON.stringify(Markdown.parse({ post: { content: String.raw`${content}` } }));
  return { props: { posts, data, markdown, params, previousPost, nextPost } };
}

export async function getStaticPaths() {
  const posts = guidesTree;
  const slugs = [];

  const allHrefs = (thisLink, tree) => {
    slugs.push(thisLink, ...tree.pages.map((e) => join(thisLink, e.slug)));
    allHrefsChildren(thisLink, tree.children);
  };

  const allHrefsChildren = (thisLink, children) => {
    Object.entries(children).map(([childSlug, child]) => {
      allHrefs(join(thisLink, childSlug), child);
    });
  };

  allHrefs("/guides", posts);
  return {
    paths: slugs,
    fallback: false,
  };
}
