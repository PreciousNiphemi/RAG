const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: "rpzdBiak9Yn9JnsQfYJQ6LImDGMbCCkCUfMFk7sT",
});

(async () => {
  (async () => {
    const stream = await cohere.chatStream({
      model: "command-nightly",
      temperature: 0.3,
      message: "Who are the engineers at the gp?",
      connectors: [
        { id: "web-search", options: { site: "https://www.thegp.com" } },
      ],
    });

    for await (const chat of stream) {
      if (chat.eventType === "text-generation") {
        process.stdout.write(chat.text);
      }
    }
  })();
})();
