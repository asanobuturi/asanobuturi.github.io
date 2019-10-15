int main(){
    int N, K, L; cin >> N >> K >> L;//まずは入力の受け取り
    unionFind road(N), rail(N);//道路用と鉄道用とで二つunionFindクラスを用意してあげる
    for(int i = 0; i < K; i++){
        int p, q; cin >> p >> q;//入力を受け取る
        road.unite(p - 1, q - 1);//pとqは連結しているため併合してあげる(扱いやすいように0-indexedにする)
    }
    //鉄道においても同じことをしてあげる
    for(int i = 0; i < L; i++){
        int r, s; cin >> r >> s;
        rail.unite(r - 1, s - 1);
    }
    vector<pair<int, int>> p(N);//各頂点iについて、道路においてグループ～、鉄道においてグループ～であるという情報を格納する配列を作ってあげる
    map<pair<int, int>, int> m;//上のような情報を連想配列形式で扱ってあげる
    for(int i = 0; i < N; i++){
        p[i] = make_pair(road.find(i), rail.find(i));
        m[p[i]]++;//mapの値を更新
    }
    for(int i = 0; i < N; i++){
        cout << m[p[i]] << " ";//最後に結果を出力してあげる
    }
    return 0;
}
