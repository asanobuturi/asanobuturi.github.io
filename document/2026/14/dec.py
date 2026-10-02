from decimal import Decimal

TYPES = Decimal(9*4+6+3) # 45, 34, 180, 136

def c(n:int, p:int)->Decimal:
    a = Decimal(1)
    for i in range(p):
        a*=Decimal(n)-Decimal(i)
        a/=Decimal(i)+1
    return a

def pow(n:int, p:int)->Decimal:
    a = Decimal(1)
    for _ in range(p):
        a*=Decimal(n)
    return a

print(6, 4, 3)

# 大四喜
print(
    pow(c(4, 3), 4)*c(6, 4)*6*45/c(180, 14),
    pow(c(4, 3), 4)*6*30/c(136, 14),
    pow(c(4, 3), 4)*6*23/c(108, 14)
)
# 国士無双
print(
    pow(c(4, 1), 12)*13*c(4, 2)*c(17, 13)/c(180, 14),
    pow(c(4, 1), 12)*13*c(4, 2)/c(136, 14),
    pow(c(4, 1), 12)*13*c(4, 2)/c(108, 14)
)
# 九蓮宝燈
print(
    4*(pow(c(4, 1), 7)*c(4, 3)*2*c(4, 4)+pow(c(4, 1), 6)*pow(c(4, 3), 2)*c(4, 2)*7)/c(180, 14),
    3*(pow(c(4, 1), 7)*c(4, 3)*2*c(4, 4)+pow(c(4, 1), 6)*pow(c(4, 3), 2)*c(4, 2)*7)/c(136, 14),
    2*(pow(c(4, 1), 7)*c(4, 3)*2*c(4, 4)+pow(c(4, 1), 6)*pow(c(4, 3), 2)*c(4, 2)*7)/c(108, 14)
)
# 清老頭
print(
    pow(c(4, 3), 4)*c(4,2)*c(8,5)*5/c(180, 14),
    pow(c(4, 3), 4)*c(4,2)*c(6,5)*5/c(136, 14),
    pow(c(4, 3), 4)*c(4,2)*c(6,5)*5/c(108, 14)
)
# 字一色
print(
    (pow(c(4, 3), 4)*c(4,2)*c(9,5)*5+pow(c(4, 2), 7)*c(9,7))/c(180, 14),
    (pow(c(4, 3), 4)*c(4,2)*c(7,5)*5+pow(c(4, 2), 7))/c(136, 14),
    (pow(c(4, 3), 4)*c(4,2)*c(7,5)*5+pow(c(4, 2), 7))/c(108, 14)
)
# 小四喜
print(
    pow(c(6, 3), 3)*c(6,1)*c(4,2)*(41*c(4,3)+7*4*pow(c(4,1), 3))/c(180, 14),
    pow(c(4, 3), 3)*c(4,1)*c(4,2)*(30*c(4,3)+7*3*pow(c(4,1), 3))/c(136, 14),
    pow(c(4, 3), 3)*c(4,1)*c(4,2)*(23*c(4,3)+7*2*pow(c(4,1), 3))/c(108, 14)
)
# 大三元
print(
    pow(c(4, 3), 3)*(42*c(4,3)*41*c(4,2)+7*4*pow(c(4, 3), 3)*42*c(4,2))/c(180, 14),
    pow(c(4, 3), 3)*(31*c(4,3)*30*c(4,2)+7*3*pow(c(4, 3), 3)*31*c(4,2))/c(136, 14),
    pow(c(4, 3), 3)*(24*c(4,3)*23*c(4,2)+7*2*pow(c(4, 3), 3)*24*c(4,2))/c(108, 14)
)
# 緑一色
print(
    (
        pow(c(4, 3), 4)*c(4,2)*c(6,5)*5+ # 4t
        c(4,2)*3+ # 4s
        pow(c(4, 3), 3)*3*c(4,3)*2*c(4,2)+ #3s,t
        pow(c(4, 2), 3)*3*pow(c(4, 3), 2)*c(4,2)+ #2s,2t with head not in 2,3,4
        pow(c(4, 2), 2)*3*pow(c(4, 3), 2)*3*c(4,2)+ #2s,2t with head in 2,3,4
        c(4, 1)*3*3*c(4,2)+ #1s,3t with 2t in 2,3,4
        c(4, 1)*c(4, 3)*3*3*c(4,3)+ #1s,3t with 1t and head in 2,3,4
        pow(c(4, 1), 2)*3*3*2*c(4,3)*c(4,2)+ #1s,3t with 1t in 2,3,4
        pow(c(4, 1), 2)*c(4,3)*3*3*pow(c(4,3), 2)+ #1s,3t with head in 2,3,4
        pow(c(4, 1), 3)*3*pow(c(4,3), 2)*c(4,2) #1s,3t with nothing else in 2,3,4
    )/c(180, 14),
    (
        pow(c(4, 3), 4)*c(4,2)*c(6,5)*5+ # 4t
        c(4,2)*3+ # 4s
        pow(c(4, 3), 3)*3*c(4,3)*2*c(4,2)+ #3s,t
        pow(c(4, 2), 3)*3*pow(c(4, 3), 2)*c(4,2)+ #2s,2t with head not in 2,3,4
        pow(c(4, 2), 2)*3*pow(c(4, 3), 2)*3*c(4,2)+ #2s,2t with head in 2,3,4
        c(4, 1)*3*3*c(4,2)+ #1s,3t with 2t in 2,3,4
        c(4, 1)*c(4,3)*3*3*c(4,3)+ #1s,3t with 1t and head in 2,3,4
        pow(c(4, 1), 2)*3*3*2*c(4,3)*c(4,2)+ #1s,3t with 1t in 2,3,4
        pow(c(4, 1), 2)*c(4,3)*3*3*pow(c(4,3), 2)+ #1s,3t with head in 2,3,4
        pow(c(4, 1), 3)*3*pow(c(4,3), 2)*c(4,2) #1s,3t with nothing else in 2,3,4
    )/c(136, 14),
    (
        pow(c(4, 3), 4)*c(4,2)*c(6,5)*5+ # 4t
        c(4,2)*3+ # 4s
        pow(c(4, 3), 3)*3*c(4,3)*2*c(4,2)+ #3s,t
        pow(c(4, 2), 3)*3*pow(c(4, 3), 2)*c(4,2)+ #2s,2t with head not in 2,3,4
        pow(c(4, 2), 2)*3*pow(c(4, 3), 2)*3*c(4,2)+ #2s,2t with head in 2,3,4
        c(4, 1)*3*3*c(4,2)+ #1s,3t with 2t in 2,3,4
        c(4, 1)*c(4,3)*3*3*c(4,3)+ #1s,3t with 1t and head in 2,3,4
        pow(c(4, 1), 2)*3*3*2*c(4,3)*c(4,2)+ #1s,3t with 1t in 2,3,4
        pow(c(4, 1), 2)*c(4,3)*3*3*pow(c(4,3), 2)+ #1s,3t with head in 2,3,4
        pow(c(4, 1), 3)*3*pow(c(4,3), 2)*c(4,2) #1s,3t with nothing else in 2,3,4
    )/c(108, 14)
)
