import { mdiDownload, mdiPrinter } from "@mdi/js";
import Button from "components/Button";
import withRouter, { WithRouterProps } from "next/dist/client/with-router";
import BasedHead from "~/components/BasedHead";
import Icon from "~/components/Icon";
import { ScrollRestorer } from "~/lib/ScrollRestorer";

export default withRouter(ResumeTestPage);

function ResumeTestPage(props: WithRouterProps) {
  // Events
  function onPrint() {
    window.print();
  }

  // Renders
  return (
    <>
      <BasedHead
        {...{
          url: props.router.asPath,
          type: "website",
          title: `MDOX Resume`,
          description: `My resume.`,
          image: `/assets/image/portrait.png`,
          imageWidth: 512,
          imageHeight: 512,
          imageAlt: `Portrait about me, Márton Dávid Orosz.`,
        }}
      />

      <div className="flex flex-wrap items-start gap-2 print:hidden">
        <a
          href="/documents/resume.pdf"
          download="Resume - Marton David Orosz.pdf"
          rel="noopener"
        >
          <Button>
            <Icon path={mdiDownload} size={1}></Icon>
            <span>Download PDF</span>
          </Button>
        </a>
        <Button onClick={onPrint}>
          <Icon path={mdiPrinter} size={1}></Icon>
          <span>Print from Browser</span>
        </Button>
      </div>

      {/* <div className="h-2 mt-4 mb-2 rounded-full shadow bg-emerald-300 print:hidden"></div> */}

      <main className="p-2 space-y-4 resume print:p-4 lg:p-4">
        {/* PROFILE */}
        <section className="flex">
          <div className="flex flex-col w-8/12 space-y-2 sapce-y-2 shrink-0">
            <h1>Márton Dávid Orosz</h1>
            <h4>
              E-mail: <a href="mailto:mdox@mdox.xyz">mdox@mdox.xyz</a>
            </h4>
            <h4>
              Phone: <a href="tel:+36303910610">+36 30 391 0610</a>
            </h4>
            <h4>
              GitHub:{" "}
              <a
                href="https://github.com/mdox"
                target="_blank"
                rel="noreferrer"
              >
                github.com/mdox
              </a>
            </h4>
            <h4>
              Website:{" "}
              <a href="https://mdox.xyz" target="_blank" rel="noreferrer">
                mdox.xyz
              </a>
            </h4>
          </div>
          <div>
            <img src="/assets/image/portrait.png" className="rounded" />
          </div>
        </section>
        {/* EDUCATION */}
        <hr />
        <section>
          <h2>Education</h2>
          <article>
            <ul>
              <li>
                Pataky István Vocational High School
                <ul>
                  <li>Basics of Electronics (2011-2016)</li>
                  <li>
                    Info-communication Network Builder and Operator (2016-2017)
                  </li>
                </ul>
              </li>
            </ul>
          </article>
        </section>
        {/* WORK EXPERIENCE */}
        <hr />
        <section>
          <h2>Work experience</h2>
          <article>
            <div className="flex items-center justify-between">
              <h3>Gramont GmbH</h3>
              <h3 className="text-yellow-600">2018.Jul - 2022.Jul</h3>
            </div>
            <ul>
              <li>
                Associate Developer
                <ul>
                  <li>Maintain and develop legacy projects</li>
                  <li>Support colleagues to code or in debugging</li>
                  <li>CI/CD</li>
                  <li>{`4 years: SAPui5 Front-end developments`}</li>
                </ul>
              </li>
            </ul>
          </article>
        </section>
        {/* SELF-TAUGHT EXPERIENCE */}
        <hr />
        <section>
          <h2>Self-taught Experience</h2>
          <article>
            <h3>Linux</h3>
            <ul>
              <li>System Admin or Super User</li>
              <li>Webserver, Mailserver</li>
              <li>Website generator using Shell Script</li>
            </ul>
          </article>
          <article>
            <h3>Programming Languages</h3>
            <ul>
              <li>{`5+ years: C, C++, JavaScript, HTML, CSS, Lua (release 5.1)`}</li>
              <li>{`1 year: C#, Shell Script (Linux), batch, Makefile`}</li>
              <li>Used: Pascal, PHP, SQL, Visual Basic</li>
            </ul>
          </article>
          <article>
            <h3>Technologies</h3>
            <ul>
              <li>3 years: VSCode</li>
              <li>2 years: Linux, git, Vim</li>
              <li>
                1 year: NodeJS, Nuxt2, NextJS, React, TypeScript, Figma, OpenGL
              </li>
              <li>
                {`Used: SolidJS, vite-plugin-ssr, nginx, Embeded Lua in C, SEO Optimization, Google LLC Lighthouse, ffmpeg`}
              </li>
            </ul>
          </article>
          <article>
            <h3>Game Developments</h3>
            <ul>
              <li>
                Roblox
                <ul>
                  <li>
                    Programming admin command line, UI Designing, 3D Modelling,
                    Programming, Hacking for learning purposes
                  </li>
                </ul>
              </li>
              <li>
                Projects about to make Game Engines
                <ul>
                  <li>
                    3D graphics, Matrix, Data-oriented design, Entity component
                    system, 3D modelling
                  </li>
                </ul>
              </li>
            </ul>
          </article>
        </section>
        {/* SKILLS */}
        <hr />
        <section>
          <h2>Skills</h2>
          <article>
            <h3>Languages</h3>
            <ul>
              <li>{`Hungarian (Native)`}</li>
              <li>{`English (Not Certified)`}</li>
            </ul>
          </article>
        </section>
        {/* ... */}
      </main>

      <ScrollRestorer />
    </>
  );
}
