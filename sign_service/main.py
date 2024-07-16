from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/sign', methods=['GET'])
def get_data():
    data = {"key": "value"}  # Sample data
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
