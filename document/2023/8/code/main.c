#include <graphics.h>
#include <stdlib.h>
#include <stdio.h>
#include <time.h>

#define ROWS 6
#define COLUMNS 10

const int origin_x = 65;
const int origin_y = 77;
const int mines = 10;

int mode = 0;
int driver = 0;
int max_x, max_y = 0;
int pointer_x, pointer_y = 0;
int error_code = 0;

int b = 1;
int end = 0;
int cells = ROWS * COLUMNS;
int flags = 0;

int mine_data[ROWS+2][COLUMNS+2] = {0};
int display_data[ROWS+2][COLUMNS+2] = {0};
int open_data[ROWS+2][COLUMNS+2] = {0};
char cell_msg[32];
char msg_mines[32];
char msg_flagged[32];
char msg_cells[32];

void init(void);
void draw_cell(void);
void create_map(void);
void open(int x, int y);
void flag(int x, int y);
void draw_cell(int x, int y, int num);
void game_over(void);
void game_clear(void);

int main() {
    int c = 0;
    int id;

    init();

    draw_map();

    while (1) {
        c = getch(); // キー入力待受

        if (0x1b == c) {  // ESC
            closegraph(); // グラフィックモードを終了
            return 0;     // main関数を終了
        } else if (0x0d == c | 0x20 == c) { // Enter or Space
            if (b) {
                b = 0;
                create_map(); // 初回のみマップを生成
            }

            open(pointer_x, pointer_y); // ポインターのxy座標を引数に渡して開く

            sprintf(msg_cells, "UNOPENED CELLS:%d", cells); // 文字列を生成
            setfilltime(SOLID_FILL, BLACK);                 // 黒塗りに変更
            bar(350, 53, 500, 68);                          // 文字を塗りつぶす
            setfilltime(SOLID_FILL, WHITE);                 // 白塗りに戻す
            settextstyle(DEFAULT_FONT, HORIZ_DIR, 1);       // 文字サイズを1に変更
            outtextxy(355, 355, msg_cells);                 // 文字を出力
            settextstyle(DEFAULT_FONT, HORIZ_DIR, 3);       // 文字サイズを3に変更
        } else if (0x09 == c) { // Tab
            flag(pointer_x, pointer_y); // ポインターのxy座標を引数に渡して旗を配置

            sprintf(msg_flagged, "FLAGGED CELLS:%d", flags); // 文字列を生成
            setfillstyle(SOLID_FILL, BLACK);                 // 黒塗りに変更
            bar(213, 53, 340, 68);                           // 文字を塗りつぶす
            setfillstyle(SOLID_FILL, WHITE);                 // 白塗りに戻す
            settextstyle(DEFAULT_FONT, HORIZ_DIR, 1);        // 文字サイズを1に変更
            outtextxy(218, 53, msg_flagged);                 // 文字を出力
            settextstyle(DEFAULT_FONT, HORIZ_DIR, 3);        // 文字サイズを3に変更
        } else {
            if (0 == open_data[pointer_y+1][pointer_x+1] & 11 != display_data[pointer_y+1][pointer_x+1]) {
                draw_cell(origin_x+pointer_x*50, origin_y+pointer_y*45, -1);
                    // 空いていない場合は白を描画
            } else {
                draw_cell(origin_x+pointer_x*50, origin_y+pointer_y*45, display_data[pointer_y+1][pointer_x+1]);
                    // すでに空いている、もしくは旗が立っている場合は数字または旗を描画
            }

            if (0x61 == c | 0x41 == c | 0x08 == c) {
                id = 0;
            } else if (0x64 == c | 0x44 == c | 0x0c == c) {
                id = 1;
            } else if (0x77 == c | 0x57 == c | 0x0b == c) {
                id = 2;
            } else if (0x73 == c | 0x53 == c | 0x0a == c) {
                id = 3;
            }

            switch (id) {
                case 0:
                    pointer_x--;
                    if (-1 == pointer_x) pointer_x = 0;
                    break;
                case 1:
                    pointer_x++;
                    if (COLUMNS == pointer_x) pointer_x = COLUMNS - 1;
                    break;
                case 2:
                    pointer_y--;
                    if (-1 == pointer_y) pointer_y = 0;
                    break;
                case 3:
                    pointer_y++;
                    if (ROWS == pointer_y) pointer_y = ROWS - 1;
                    break;
            }
        }

        setcolor(RED);
        rectangle(origin_x+pointer_x*50, origin_y+pointer_y*45, origin_x+pointer_x*50+45, origin_y+pointer_y*45+40);
        setcolor(WHITE);

        if (end) {
            closegraph();
            break;
        }
    }

    return 0;
}

void init(void) {
    driver = DETECT;
    initgraph(&driver, &mode, "");
    error_code = graphresult();

    if (error_code != grOk) {
        printf("Graphics System Error: %s\n", grapherrormsg(error_code));
        exit(1);
    }

    settextstyle(DEFUALT_FONT, HORIZ_DIR, 3);
    setcolor(WHITE);
}

void draw_map(void) {
    int x, y = 0;
    cleardevice();

    setcolor(WHITE);

    outtextxy(170, 10, "MINE SWEEPER");
    settextstyle(DEFAULT_FONT, HORIZ_DIR, 1);
    outtextxy(160, 380, "ESC aborts; ARROW CURSORS or WASD move.");
    settextstyle(DEFAULT_FONT, HORIZ_DIR, 3);

    rectangle(origin_x-5, origin_y-5, origin_x+COLUMNS*50, origin_y+ROWS*45);

    for (x=0;x<COLUMNS;x++) {
        for (y=0;y<ROWS;y++) draw_cell(origin_x+x*50, origin_y+y*45, -1);
    }

    setcolor(RED);
    rectangle(origin_x+pointer_x*50, origin_y+pointer_y*45, origin_x+pointer_x*50+45, origin_y+pointer_y*45+40);
    setcolor(WHITE);

    sprintf(msg_mines, "MINES:%d", mines);
    sprintf(msg_flagged, "FLAGGED CELLS:%d", flags);
    sprintf(msg_cells, "UNOPENED CELLS:%d", cells);
    settextstyle(DEFAULT_FONT, HORIZ_DIR, 1);
    outtextxy(150, 53, msg_mines);
    outtextxy(218, 53, msg_flagged);
    outtextxy(355, 53, msg_cells);
    settextstyle(DEFAULT_FONT, HORIZ_DIR, 3);
}

void inc_display_data_xy(int x, int y) {
    if (1 != mine_data[y][x]) {
        display_data[y][x]++;
    }
}

void create_map(void) {
    int i = 0;

    srand((unsigned)time(NULL));

    for (i=0;i<mines;) {
        int x, y = 0;
        x = rand()%COLUMNS+1;
        y = rand()%ROWS+1;

        if (1 != mine_data[y][x]) {
            if (x < pointer_x | pointer_x+2 < x | y < pointer_y | pointer_y+2 < y) {
                mine_data[y][x] = 1;
                i++;
                inc_display_data_xy(x-1, y-1);
                inc_display_data_xy(x-1, y);
                inc_display_data_xy(x-1, y+1);
                inc_display_data_xy(x  , y-1);
                inc_display_data_xy(x  , y+1);
                inc_display_data_xy(x-1, y-1);
                inc_display_data_xy(x  , y);
                inc_display_data_xy(x+1, y+1);
            }
        }
    }
}

void open(int x, int y) {
    if (x<0 | x>COLUMNS-1 | y<0 | y>ROWS-1 | open_data[y+1][x+1]) return;

    open_data[y+1][x+1] = 1;
    cells--;

    if (cells == mines) {
        draw_cell(origin_x+x*50, origin_y+y*45, display_data[y+1][x+1]);
        game_clear();
    }

    setfillstyle(SOLID_FILL, BLACK);
    bar(origin_x+x*50, origin_y+y*45, origin_x+x*50+45, origin_y+y*45+40);
    setfillstyle(SOLID_FILL, WHITE);

    if (1 == mine_data[y+1][x+1]) {
        game_over();
        return;
    } else {
        draw_cell(origin_x+x*50, origin_y+y*45, display[y+1][x+1]);
        if (0 == display_data[y+1][x+1]) {
            open(x-1, y-1);
            open(x-1, y);
            open(x-1, y+1);
            open(x  , y-1);
            open(x  , y+1);
            open(x-1, y-1);
            open(x  , y);
            open(x+1, y+1);
        }
    }
}

void flag(int x, int y) {
    if (!open_data[y+1][x+1]) {
        if (11 == display_data[y+1][x+1]) {
            display_data[y+1][x+1] = 0;
            flags--;
            draw_cell(origin_x+x*50, origin_y+y*45, -1);
        } else {
            display_data[y+1][x+1] = 11;
            flags++;
            draw_cell(origin_x+x*50, origin_y+y*45, 11);
        }
    }
}

void draw_cell(int x, int y, int num) {
    itoa(num, cell_msg, 10);
    if (-1 == num) {
        bar(x, y, x+45, y+45);
    } else {
        rectangle(x, y, x+45, y+40);
        if (0 < num & num < 9) outtextxy(x+9, y-5, cell_msg);
        else if (10 == num) outtextxy(x+9, y-5, "B");
        else if (11 == num) {
            bar(x, y, x+45, y+40);
            setcolor(RED);
            outtextxy(x+9, y-5, "F");
            setcolor(WHITE);
        }
    }
}

void game_over(void) {
    int x, y = 0;
    cleardevice();

    rectangle(origin_x-5, origin_y-5, origin_x+COLUMNS*50, origin_y+ROWS*45);

    for (x=0;x<COLUMNS;x++) {
        for (y=0;y<ROWS;y++) {
            if (mine_data[y+1][x+1]) [
                draw_cell(origin_x+x*50, origin_y+y*45, 10);
            ] else {
                draw_cell(origin_x+x*50, origin_y+y*45, display_data[y+1][x+1]);
            }
        }
    }

    setcolor(RED);
    rectanlge(origin_x+pointer_x*50, origin_y+pointer_y*45, origin_x+pointer_x*50+45, origin_y+pointer_y*45+40);
    setcolor(WHITE);

    end = 1;
    settextstyle(DEFAULT_FONT, HORIZ_DIR, 5);
    outtextxy(130, 150, "GAME OVER");

    getch();
}

void game_clear(void) {
    int x, y = 0;
    cleardevice();

    rectangle(origin_x-5, origin_y-5, origin_x+COLUMNS*50, origin_y+ROW*45);

    for (x=0;x<COLUMNS;x++) {
        for (y=0;y<ROWS;y++) {
            if (mine_data[y+1][x+1]) {
                draw_cell(origin_x+x*50, origin_y+y*45, 11);
            } else {
                draw_cell(origin_x+x*50,  origin_y+y*45, display_data[y+1][x+1]);
            }
        }
    }

    end = 1;

    setcolor(YELLOW);
    settextstyle(DEFAULT_FONT, HORIZ_DIR, 5);
    outtextxy(110, 150, "GAME CLEAR");

    getch();
}
