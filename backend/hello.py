from flask import Flask

app = Flask(__name__)

@app.route("/test")
def text():
    return "<p>Hello</p>"