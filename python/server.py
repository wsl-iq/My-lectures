import flask
import os

class Server:
    def __init__(self):
        self.app = flask.Flask(__name__)
        self.setup_routes()
        self.setup_static_files()

def setup_routes(self):
        @self.app.route('/')
        def index():
            return flask.send_from_directory('static', 'index.html')
        @self.app.route('/js/<path:filename>')
        def serve_js(filename):
            return flask.send_from_directory(os.path.join('static', 'js'), filename)
        @self.app.route('/css/<path:filename>')
        def serve_css(filename):
            return flask.send_from_directory(os.path.join('static', 'css'), filename)
        @self.app.route('/morning/<path:filename>')
        def serve_morning(filename):
            return flask.send_from_directory(os.path.join('static', 'morning'), filename)
if __name__ == '__main__':
    server = Server()
    server.app.run(debug=True)