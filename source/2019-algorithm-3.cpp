class unionFind{

private:
    std::vector<int> par;
    std::vector<int> rank;
    
public:
    unionFind(int N) : par(N), rank(N){
        
        for(int i = 0; i < N; i++){
            par[i] = i;//まず自分自身の親は自分自身であると定義します(初期状態としてそれぞれの要素は別々のグループなので)
            rank[i] = 0;
        }
    }
    int find(int x){//根を求める
        if(par[x] == x)return x;
        else return par[x] = find(par[x]);
    }
    void unite(int x, int y){//要素xが属するグループと要素yが属するグループを併合する
        x = find(x);
        y = find(y);
        if(x == y)return;
        if(rank[x] < rank[y])par[x] = y;
        else{
            par[y] = x;
            if(rank[x] == rank[y])rank[x]++;
        }
    }
    bool same(int x, int y){//もし根が等しければ同じグループとしてみなしてあげる
        return find(x) == find(y);
    }
};
