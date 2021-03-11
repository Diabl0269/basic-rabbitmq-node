import amqp from "amqplib";

const queueName = "jobs";

const connect = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue(queueName);
    channel.consume(queueName, (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Recieved job with input: ${input.number}`);
      if (input.number == 7) {
        channel.ack(message);
      }
    });
    console.log("Waiting for messages");
  } catch (ex) {
    console.error(ex);
  }
};
connect();
