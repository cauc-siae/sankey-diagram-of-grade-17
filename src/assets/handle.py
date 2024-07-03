import json
import pandas as pd

df = pd.read_csv("中欧学院2017级人数变化图-数据data.csv")
df.to_json("data.json", force_ascii=False)

with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

keys = ["源", "目标", "值"]
sub_keys = map(str, range(0, 100))

node_names = []
node_in_counts = {}
node_out_counts = {}
links = []


for sub_key in sub_keys:
    if sub_key not in data["源"]:
        break

    source = data["源"][sub_key]
    target = data["目标"][sub_key]
    value = data["值"][sub_key]

    node_names.append(source)
    node_names.append(target)

    if source in node_out_counts:
        node_out_counts[source] += value
    else:
        node_out_counts[source] = value

    if target in node_in_counts:
        node_in_counts[target] += value
    else:
        node_in_counts[target] = value


    link = {"source": source, "target": target, "value": value}
    links.append(link)

nodes = list(map(lambda x: {"name": x}, list(set(node_names))))

# nodes.sort(key=lambda x: node_in_counts.get(x["name"], 0) + node_out_counts.get(x["name"], 0), reverse=True)
# links.sort(key=lambda x: x["value"], reverse=True)

outputs = {"nodes": nodes, "links": links}

with open("cleaned_data.json", "w", encoding="utf-8") as f:
    json.dump(outputs, f, indent=2, ensure_ascii=False)
