import amqp from 'amqplib'
import dotenv from 'dotenv'
dotenv.config();

export const rabbitSend = async(queue, routeKey, data)=>{

    const Channel = (await (await amqp.connect(process.env.AMQP_URL)).createChannel())
    await Channel.assertExchange("DirectExchange", 'direct', { durable: true }); 
    await Channel.assertQueue(queue, { durable: true });
    await Channel.bindQueue(queue, "DirectExchange", routeKey);
    Channel.publish("DirectExchange", routeKey, Buffer.from(JSON.stringify(data)))
        ?console.log(`Your message ${data} has been sent, you can access it using "http://localhost:7070/api/v1/posts/consume"`)
        :console.log(`Your message failed to send`)
}

