#include <stdlib.h>
#include <iostream>
#include <conio.h>


int main(int argc, char** argv) {
    if (argv[1]) {
        std::cout << argv[1]; 
    }

    getch();
    exit(0);
}
