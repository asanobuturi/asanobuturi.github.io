int main(){
    unsigned long long N, Q; cin &gt;&gt; N &gt;&gt; Q;//入力を受けとる
    vector&lt;int&gt; X(N);

    for(int i = 0; i &lt; N; i++)cin &gt;&gt; X[i];//入力を受け取る
    vector&lt;int&gt; S(N + 1, 0);

    for(int i = 0; i &lt; N; i++){
        S[i + 1] = S[i] + X[i];//ここでワンポイント。一つ前のSの値を再利用することで計算量を削減できる

    for(int i = 0; i &lt; Q; i++){
        unsigned long long l, r; cin &gt;&gt; l &gt;&gt; r;
        cout &lt;&lt; S[r] - S[l] &lt;&lt; endl;
    }
return 0;
}
