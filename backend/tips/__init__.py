def load_fire_tips():
    fire_tips = []
    with open("./tips/fire_tips", "r") as f:
        for line in f.readlines():
            fire_tips.append(line)
    return fire_tips
