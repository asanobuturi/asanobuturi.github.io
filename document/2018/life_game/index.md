```c
    for (int y = 0; y < ARRAY_SIZE; y++)//ARRAY_SIZE:これの自乗個の⏎
        for (int x = 0; x < ARRAY_SIZE; x++) {//マス上で動かす。
            int count = 0;
            for (int y2 = -1; y2 < 2; y2++) {
                for (int x2 = -1; x2 < 2; x2++) {
                try
                {
                    if (map.at(y + y2).at(x + x2)
                    && !(x2 == 0 && y2 == 0))count++;//周辺の生きたセルの数
                }
                catch (const std::exception&) {}//ここで若干楽をする
                }
            }
            if (map[y][x]) {//↓過疎および過密判定
            if (count <= 1 || count >= 4)map2[y][x] = false;
        }
        else if (count == 3)map2[y][x] = true; //誕生部分
    }
map = map2;
```
