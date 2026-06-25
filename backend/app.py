from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import requests

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key="AIzaSyBuSEuPRfVTp4Akh-99IjE_nkdlcoxQYyw")
TMDB_API_KEY = "f1dd117eac16b1fbcbaf3e24cead2589"

def get_movies_from_tmdb(genres):
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "with_genres": genres,
        "sort_by": "popularity.desc"
    }
    response = requests.get(url, params=params)
    return response.json()

@app.route("/recommend", methods=["POST"])
def recommend():
    user_input = request.json["mood"]

    prompt = f"""
    Convert this mood into TMDB genre IDs only.
    Mood: {user_input}

    Available genres:
    28 = Action
    35 = Comedy
    18 = Drama
    27 = Horror
    53 = Thriller
    878 = Sci-Fi
    9648 = Mystery

    Return only genre numbers separated by comma.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    genres = response.choices[0].message.content.strip()
    movies = get_movies_from_tmdb(genres)

    return jsonify(movies)

if __name__ == "__main__":
    app.run(debug=True)
