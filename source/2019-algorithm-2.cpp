int N, M;
void dfs(int x, int y, vector<vector<char>> &g){
        g[y][x] = '.';//もうg[y][x]は探索したのでWから.にしてあげる
   for(int dx = -1; dx <= 1; dx++)for(int dy = -1; dy <= 1; dy++){//4つのベクトルを用意してあげて八近傍をそれぞれ探索
        int nx = x + dx, ny = y + dy;
        if(0 <= nx && nx < M && 0 <= ny && ny < N && g[ny][nx] == 'W'){//もし８近傍がグリッドの範囲内でもしWだったら状態の遷移をする(再帰呼び出し)
            dfs(nx, ny, g);
        }
    }
}
int main(){
cin >> N >> M;
vector<vector<char>> g(N, vector<char>(M));
for(int i = 0; i < N; i++){
        for(int j = 0; j < M; j++){
            cin >> g[i][j];
        }
    }
    //入力の受け取り

    int ans = 0;
    for(int i = 0; i < N; i++)for(int j = 0; j < M; j++){
        if(g[i][j] == 'W'){//もしそこが水溜まりだったら探索する
            dfs(j, i, g);
            ans++;
        }
    }
    cout << ans;//最後に答えを出力する
    return 0;
}
