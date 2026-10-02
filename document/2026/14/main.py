import random
from collections import defaultdict, Counter
import sys

def prev(tile: str) -> str:
    return tile[0] + str(int(tile[1]) - 1)

def next(tile: str) -> str:
    return tile[0] + str(int(tile[1]) + 1)

def is_over(counts: Counter) -> bool:
    for tile in list(counts.keys()):
        if counts[tile] >= 2:
            counts[tile] -= 2
            head.append(tile)
            if check_rest(counts):
                return True
            counts[tile] += 2
            head.remove(tile)

    return False

def check_rest(counts: Counter) -> bool:
    if sum(counts.values()) == 0: return True

    for tile in list(counts.keys()):
        if len(tile) == 2: continue # 字牌だけ調べる
        if counts[tile] >= 3:
            counts[tile] -= 3
            three.append(tile)
            if check_rest(counts):
                return True
            elif len(tile) == 1: continue
            counts[tile] += 3
            three.remove(tile)

    for tile in list(counts.keys()):
        if len(tile) == 1: continue
        if all([counts[prev(tile)], counts[tile], counts[next(tile)]]):
            counts[prev(tile)] -= 1
            counts[tile] -= 1
            counts[next(tile)] -= 1
            straight.append(tile)
            if check_rest(counts):
                return True
            counts[prev(tile)] += 1
            counts[tile] += 1
            counts[next(tile)] += 1
            straight.remove(tile)

    for tile in list(counts.keys()):
        if len(tile) == 1: continue # 数牌だけ調べる
        if counts[tile] >= 3:
            counts[tile] -= 3
            three.append(tile)
            if check_rest(counts):
                return True
            elif len(tile) == 1: continue
            counts[tile] += 3
            three.remove(tile)

    return False

N = 500000000

tiles:list[str] = []
S_TYPES = ["m", "s", "p", "a"] if sys.argv[1] == "6" else ["m", "s", "p"]
SUITS = []
HONORS = []
ONN = []

YAKUMAN = ["緑一色", "大三元", "小四喜", "字一色", "国士無双", "九蓮宝燈", "清老頭", "大四喜"]

results = defaultdict(int)

for t in S_TYPES:
    SUITS = [f"{t}{i+1}" for i in range(9)]
    tiles.extend(SUITS*4)

    ONN.extend([f"{t}{i}" for i in [1, 9]])

HONORS = list("xXyYzZDHT") if sys.argv[1] == "6" else list("xXyYDHT")
tiles.extend(HONORS*4)

H = [
    # ["s3", "s3", "s4", "s4", "s5", "s5", "m2", "m2", "m2", "p1", "p2", "p3", "x", "x"],
    # ["m1", "m1", "m4", "m4", "m8", "m8", "m9", "m9", "p4", "p4", "s2", "s2", "x", "x"],
    # ["m4", "m4", "m4", "m9", "m9", "m9", "s2", "s2", "s2", "T", "T", "x", "x", "x"],
    # ["m6", "m6", "m6", "p6", "p6", "p6", "s6", "s6", "s6", "s7", "s8", "s9", "m9", "m9"],
    # ["D", "D", "m1", "m2", "m3", "p1", "p2", "p3", "s1", "s2", "s3", "m6", "m7", "m8"],
    # ["H", "H", "H", "x", "x", "x", "s9", "s9", "s9", "m1", "m1", "p1", "p1", "p1"],
    # ["m2", "m3", "m4", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "D", "D"],
    # ["m9", "m9", "m9", "m1", "m2", "m3", "s1", "s2", "s3", "s9", "s9", "s9", "D", "D"],
    # ["D", "D", "H", "H", "H", "T", "T", "T", "s6", "s7", "s8", "m8", "m8", "m8"],
    # ["p1", "p1", "p1", "p2", "p2", "p2", "p5", "p6", "p7", "x", "x", "x", "X", "X"],
    # ["p1", "p1", "p1", "p2", "p3", "p7", "p8", "p9", "s1", "s2", "s3", "s9", "s9", "s9"],
    # ["s2", "s2", "s3", "s3", "s4", "s4", "p6", "p6", "p7", "p7", "p8", "p8", "H", "H"],
    # ["m1", "m2", "m3", "m4", "m4", "m4", "m6", "m6", "m7", "m7", "m7", "m9", "m9", "m9"],

    # ["s2", "s2", "s2", "s2", "s3", "s4", "s6", "s6", "s6", "s8", "s8", "s8", "H", "H"],
    # ["D", "D", "D", "H", "H", "H", "T", "T", "T", "s6", "s7", "s8", "m8", "m8"],
    # ["x", "x", "x", "X", "X", "X", "y", "y", "y", "Y", "Y", "s2", "s2", "s2"],
    # ["x", "x", "X", "X", "X", "y", "y", "y", "D", "D", "D", "T", "T", "T"],
    # ["m1", "m1", "m9", "p1", "p9", "s1", "s9", "x", "X", "y", "Y", "D", "H", "T"],
    # ["m1", "m1", "m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m9", "m9", "m9"],
    # ["m1", "m1", "m1", "p1", "p1", "p1", "p9", "p9", "p9", "s9", "s9", "s9", "m9", "m9"],
    # ["x", "x", "x", "X", "X", "X", "y", "y", "y", "Y", "Y", "Y", "s2", "s2"],
]

def refresh():
    for k, v in tmp.items():
        results[k] += v

for _ in ["_"]*N:
    hands = random.sample(tiles, 14)
    hands.sort()
    tmp = defaultdict(int)

    c = Counter(hands)

    head = []
    straight = []
    three = []

    if is_over(c):
        for t in three:
            if t in HONORS:
                tmp[t] += 1

        if len([t for t in hands if t in list(set(tiles)-set(HONORS+ONN))]) == 14:
            if all([1<int(h[1])<9 for h in hands]):
                tmp["断么九"] += 1

        if len(straight) == 4:
            if not head in HONORS:
                tmp["平和"] += 1

        if len(three) == 4:
            tmp["対々和"] += 1

        if len(three) >= 3:
            if 3 in Counter([t[1] for t in [x for x in three if len(x) == 2]]).values():
                tmp["三色同刻"] += 1

        if len(straight) >= 3:
            if 3 in Counter([s[1] for s in  [x for x in straight if len(x) == 2]]).values():
                tmp["三色同順"] += 1

        if len(straight) - len(set(straight)) == 1:
            tmp["一盃口"] += 1

        if len(straight) >= 3:
            for t in S_TYPES:
                if set([f"{t}{i*3+2}" for i in range(3)]) <= set(straight):
                    tmp["一気通貫"] += 1
                    break

        if all([(t in HONORS+ONN) for t in hands]):
            if all([(t in ONN) for t in hands]):
                tmp["清老頭"] += 1
            else:
                tmp["混老頭"] += 1

        if len(head[0]) == 2 and all([len(t) == 2 for t in hands]):
            if all([t[1] in ["1", "9"] for t in three]) and all([s[1] in ["2", "8"] for s in straight]) and head[0][1] in ["1", "9"]:
                    tmp["純全帯么九"] += 1

        else:
            flag = 1
            for t in three:
                if len(t) == 1:
                    continue
                elif t[1] in ["1", "9"]:
                    continue
                flag = 0

            for s in straight:
                if len(s) == 1:
                    continue
                elif s[1] in ["2", "8"]:
                    continue
                flag = 0

            if not(len(head[0]) == 1 or head[0][1] in ["1", "9"]):
                flag = 0

            if flag and tmp["混老頭"]:
                tmp["混全帯么九"] += 1

        if set(list("DHT")) <= set(three+head):
            if head[0] in ["D", "H", "T"]:
                tmp["小三元"] += 1

                dht = ["D", "H", "T"]
                dht.remove(head[0])

                for t in dht:
                    tmp[t] -= 1

            else:
                tmp["大三元"] += 1

        if len(Counter([t[0] for t in hands if len(t) == 2])) == 1:
            tmp["混一色"] += 1

        if 14 in Counter([t[0] for t in hands if len(t) == 2]).values():
            flag = 1
            for i in range(9):
                if Counter(hands)[f"{hands[0][0]}{i+1}"] < [3, 1, 1, 1, 1, 1, 1, 1, 3][i]:
                    flag = 0
                    break
            if flag:
                tmp["九蓮宝燈"] += 1
                tmp["一気通貫"] -= 1
            else:
                tmp["清一色"] += 1
            tmp["混一色"] -= 1

        if len(straight) - len(set(straight)) == 2:
            tmp["二盃口"] += 1

        if set(hands) <= set(["s2", "s3", "s4", "s6", "s8", "H"]):
            tmp["緑一色"] += 1

        if len(set(three) & set(list("xXyYzZ"))) == 4:
            tmp["大四喜"] += 1

        if len(set(three) & set(list("xXyYzZ"))) == 3 and head[0] in list("xXyYzZ"):
            tmp["小四喜"] += 1

        if set(hands) <= set(HONORS):
            tmp["字一色"] += 1

        tmp["立直"] += 1

    # 国士無双
    elif (len(set(hands)) == 13 or len(set(hands)) == 14) and all([h in ONN+HONORS for h in hands]):
        tmp["国士無双"] += 1

    # 七対子
    elif len(set(hands)) == 7 and all([hands.count(h) == 2 for h in set(hands)]):
        tmp["七対子"] += 1

    if any([tmp[y] for y in YAKUMAN]):
        for y in list(set(tmp.keys()) - set(YAKUMAN)):
            tmp[y] = 0

    is_yaku = [y for y in tmp.keys() if tmp[y]>0]
    if is_yaku:
        print(hands)
        print(is_yaku)

    refresh()

print(dict(results))
