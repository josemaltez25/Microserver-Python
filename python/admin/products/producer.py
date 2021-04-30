import pika, json

params = pika.URLParameters('amqps://hlersinq:CwqYq993nQi27b_LcelK0iNTAKQ3_SZw@gull.rmq.cloudamqp.com/hlersinq')

connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='main', body=json.dumps(body), properties=properties)
