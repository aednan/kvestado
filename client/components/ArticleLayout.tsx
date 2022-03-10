import React, { ReactNode } from "react";


const ArticleLayout = ({ children, meta }: { children: ReactNode, meta:any }) => {
 
  const {
    title,
    description,
    coverImage,
    publishedAt,
    readTime, 
  } = meta;

 
  return (
       
      <article className=" px-7 pt-32 pb-14 ">

           {title && (
            <h1 className="w-full max-w-5xl mx-auto text-center  mb-8 text-3xl font-extrabold lg:text-6xl md:text-5xl sm:text-4xl lg:mb-10 leading-tighter">
              {title}
              {/* Build und Ausführung des Java-Programms */}
            </h1>
           )}
    <main className="prose prose-stone lg:prose-xl max-w-5xl mx-auto prose-pre:max-h-80 prose-pre:overflow-auto">
        

        {children}

        {/* <img src="/img/cexchange.svg" alt="" /> */}
        {/* <p>
          For years parents have espoused the health benefits of eating garlic
          bread with cheese to their children, with the food earning such an
          iconic status in our culture that kids will often dress up as warm,
          cheesy loaf for Halloween.
        </p>
        <p>
          But a recent study shows that the celebrated appetizer may be linked
          to a series of rabies cases springing up around the country.
        </p>
        <code>hjhjhjhjhj hjhj</code>
        <ol>
          <li>We want everything to look good out of the box.</li>
          <li>
            Really just the first reason, that's the whole point of the plugin.
          </li>
          <li>
            Here's a third pretend reason though a list with three items looks
            more realistic than a list with two items.
          </li>
        </ol>

        <code>
          kjkjsd fjksdfjksjd fjksdfjksjdsdfkjkjsdfkj sdfjkjsdfkjsfsdkjfjksdfsfkj
          sdfjkjsdfkjsfsdkjfjksdfsfkjsdfjkjsjdf
          sdfjkjsdfkjsfsdkjfjksdfsfkjsdfjksdjfk
          sdfjkjsdfkjsfsdkjfjksdfsfkjsdjksdjkf
          sdfjkjsdfkjsfsdkjfjksdfsfkjsfkjjskdf
        </code>

        <blockquote>
          <p>
            Why is Tailwind removing the default styles on my <code>h1</code>{" "}
            elements? How do I disable this? What do you mean I lose all the
            other base styles too?
          </p>
        </blockquote>

        <pre><code >&lt;article class="prose"&gt;
  &lt;h1&gt;Garlic bread with cheese: What the science tells us&lt;/h1&gt;
  &lt;p&gt;
    For years parents have espoused the health benefits of eating garlic bread with cheese to their
    children, with the food earning such an iconic status in our culture that kids will often dress
    up as warm, cheesy loaf for Halloween.
  &lt;/p&gt;
  &lt;p&gt;
    But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
    springing up around the country.
  &lt;/p&gt;
  &lt;!-- ... --&gt;
&lt;/article&gt;
</code></pre>
        <hr />
        <figure>
          <img src="/img/cexchange.svg" alt="" />
          <figcaption>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </figcaption>
        </figure>

        <ul>
          <li>So here is the first item in this list.</li>
          <li>In this example we're keeping the items short.</li>
          <li>Later, we'll use longer, more complex list items.</li>
        </ul>

        <table>
          <thead>
            <tr>
              <th>Wrestler</th>
              <th>Origin</th>
              <th>Finisher</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bret "The Hitman" Hart</td>
              <td>Calgary, AB</td>
              <td>Sharpshooter</td>
            </tr>
            <tr>
              <td>Stone Cold Steve Austin</td>
              <td>Austin, TX</td>
              <td>Stone Cold Stunner</td>
            </tr>
            <tr>
              <td>Randy Savage</td>
              <td>Sarasota, FL</td>
              <td>Elbow Drop</td>
            </tr>
            <tr>
              <td>Vader</td>
              <td>Boulder, CO</td>
              <td>Vader Bomb</td>
            </tr>
            <tr>
              <td>Razor Ramon</td>
              <td>Chuluota, FL</td>
              <td>Razor's Edge</td>
            </tr>
          </tbody>
        </table> */}
    </main>
      </article>
  );
};

export default ArticleLayout;
