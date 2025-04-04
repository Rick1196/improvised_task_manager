module.exports = {
  rules: {
    "no-use-client-in-app": {
      meta: {
        type: "problem", // Could also be "suggestion"
        docs: {
          description: "Warn when using 'use client' in files inside the app/ directory",
          recommended: false,
        },
        messages: {
          avoidUseClient: "'use client' should not be used in files inside the app/ directory.",
        },
      },
      create(context) {
        const filePath = context.getFilename();

        // Apply rule only to files inside the "app/" directory
        if (!filePath.includes("/src/app/")) {
          return {};
        }

        return {
          Program(node) {
            const firstStatement = node.body[0];

            if (
              firstStatement.expression.value === "use client"
            ) {
              context.report({
                node: firstStatement,
                messageId: "avoidUseClient",
              });
            }
          },
        };
      },
    },
  },
};
