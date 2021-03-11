import amqp from "amqplib";

const queueName = "jobs";

const msg = { number: process.argv[2] };
const connect = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
    console.log(`Job sent sccefully: ${msg.number}`);
  } catch (ex) {
    console.error(ex);
  }
};
connect();
