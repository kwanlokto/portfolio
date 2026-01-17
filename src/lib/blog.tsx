export const blog = {
  title: "The Pragmatic Programmer",
  sections: [
    {
      subtitle: "What Does 'Pragmatic' Actually Mean?",
      content: (
        <>
          <p>
            Being pragmatic isn't about taking shortcuts. It's about making
            smart tradeoffs. You write code that works <em>and</em> lasts. You
            solve real problems instead of just flexing your technical chops.
            You get better over time, and you take ownership of what you ship.
          </p>
          <p>
            The book frames software development as something you can practice
            and master, like woodworking or cooking. Not something you just
            “do.”
          </p>
        </>
      ),
    },
    {
      subtitle: "Own Your Code",
      content: (
        <>
          <p>
            Early on, the book drops this line: “Don't live with broken
            windows.” Meaning: if you see messy code, unclear docs, or failing
            tests — fix them. Or at least don't ignore them. Little problems
            pile up into technical debt that'll crush you later.
          </p>
          <p>
            Good developers don't just write code. They own it. They own their
            mistakes and their growth too.
          </p>
        </>
      ),
    },
    {
      subtitle: "DRY: Don't Repeat Yourself",
      content: (
        <>
          <p>
            You've probably heard this one. But it's not just about
            copy-pasting. It's about duplicated <em>logic</em>, duplicated{" "}
            <em>knowledge</em>, duplicated <em>assumptions</em>. When something
            needs to change, you want to change it in exactly one place.
          </p>
          <p>
            DRY makes your codebase cleaner, easier to maintain, and less
            bug-prone.
          </p>
        </>
      ),
    },
    {
      subtitle: "Design for Change",
      content: (
        <>
          <p>
            Here's the thing: requirements change. Teams grow. Systems scale. So
            instead of optimizing for today's features, optimize for
            flexibility.
          </p>
          <p>
            Good code has clear boundaries. It's loosely coupled. You can modify
            one part without breaking three others. The book hammers this home —
            being clever is fine, but being flexible is better.
          </p>
        </>
      ),
    },
    {
      subtitle: "Master Your Tools",
      content: (
        <>
          <p>
            Pragmatic programmers really understand their editors, debuggers,
            shells, and version control. They automate repetitive stuff. They
            learn the shortcuts. Saving a few seconds dozens of times a day?
            That compounds into real productivity.
          </p>
          <p>The book pushes you to invest time in your tools. It pays off.</p>
        </>
      ),
    },
    {
      subtitle: "Test as You Go",
      content: (
        <>
          <p>
            Testing isn't something you tack on at the end. It's part of working
            through the problem. Write tests alongside your code. Automate where
            you can. Treat tests like living documentation.
          </p>
          <p>
            This lines up perfectly with modern practices like TDD and CI/CD,
            which didn't even exist when the first edition came out.
          </p>
        </>
      ),
    },
    {
      subtitle: "Communicate Like It Matters",
      content: (
        <>
          <p>
            Software isn't just code. It's people. You need to write clear docs,
            ask good questions, and explain tradeoffs to non-technical
            stakeholders. Communication is a technical skill.
          </p>
          <p>
            A lot of projects fail because of misunderstandings, not bad
            engineering.
          </p>
        </>
      ),
    },
  ],
};
