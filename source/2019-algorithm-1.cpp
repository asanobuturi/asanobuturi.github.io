int main(){
    unsigned long long N, Q; cin >> N >> Q;//入力を受けとる
    vector<int> X(N);

    for(int i = 0; i &lt; N; i++)cin >> X[i];//入力を受け取る
    vector<int> S(N + 1, 0);

    for(int i = 0; i &lt; N; i++){
        S[i + 1] = S[i] + X[i];//ここでワンポイント。一つ前のSの値を再利用することで計算量を削減できる

    for(int i = 0; i &lt; Q; i++){
        unsigned long long l, r; cin >> l >> r;
        cout << S[r] - S[l] << endl;
    }
return 0;
}
