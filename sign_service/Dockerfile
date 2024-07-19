FROM  python:3.9

WORKDIR /service 
RUN python -m pip install --upgrade pip

COPY . /service
RUN pip3 install -Ur ./requirements.txt --verbose
EXPOSE 50051
CMD [ "python3", "/service/main.py" ]