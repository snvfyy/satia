FROM python:3.5-slim

ENV basedir /app
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8


WORKDIR $basedir

COPY ./backend .

# RUN     pip install pipenv
# RUN     pipenv install --system
RUN     pip install flask \
    &&  pip install requests

EXPOSE 5000

ENTRYPOINT ["python3", "app.py"]