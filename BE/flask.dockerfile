FROM python:3.6-slim-buster

WORKDIR /app

COPY requirements.txt ./
# Install dependencies
RUN pip install -r requirements.txt
# Copy all other files
COPY . .
# Expose the port i'll use
EXPOSE 4000

CMD [ "flask", "run", "--host=0.0.0.0", "--port=4000"]