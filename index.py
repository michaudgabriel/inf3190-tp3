# Copyright 2023 Gabriel Michaud (MICG93070107)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask
from flask import render_template
from flask import g
from .database import Database
import random

app = Flask(__name__, static_url_path="", static_folder="static")


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()


@app.route('/')
def form():
    animaux = get_db().get_animaux()
    animaux_choisis = []
    i = 0
    while i < 5:
        choix = random.choice(animaux)
        id = choix["id"]
        j = 0
        trouve = False
        while not trouve and j < len(animaux_choisis):
            if id == animaux_choisis[j]["id"]:
                trouve = True
            j += 1
        if not trouve:
            animaux_choisis.append(choix)
            i += 1
    return render_template('form.html', animaux = animaux_choisis)

@app.route('/page_animal/<nom>')
def page_animal():
    animal = request.args.get('animal')
    return render_template('page.html', animal=animal)
