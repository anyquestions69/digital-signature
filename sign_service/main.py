import grpc
from concurrent import futures
import file_pb2
import file_pb2_grpc
import create_stamp

class StampService(file_pb2_grpc.StampServicer):
    def CreateStamp(self, request, context):
        print(request)
        res=create_stamp.create_stamp(request.filename)
        print(res)
        return file_pb2.Res(message='done')

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    file_pb2_grpc.add_StampServicer_to_server(StampService(), server)
    server.add_insecure_port('stamp:50051')
    server.start()
    print('service started')
    server.wait_for_termination()
print('starting...')
#serve()
res=create_stamp.create_stamp('c:\\Users\\User\\Downloads\\1111.pdf')
#print(res)