#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>
#include "generator.h"

int main(int argc, char **argv) {
    char dirName[512];
    char tmpValidCheckFile[512];
    int tmpFd;
    int retVal = 0;

    if (argc < 2) {
        printf("Incorrect usage.\nUSAGE: %s <image folder path>\n", argv[0]);
        exit(-1);
    }

    memset(dirName, 0, 512);
    sscanf(argv[1], "%s", dirName);
    if (argc > 2) {
        for (int i = 2; i < argc; i++) {
            snprintf(dirName, 512, "%s %s", dirName, argv[i]);
        }
    }

    snprintf(tmpValidCheckFile, 512, "%s/%s", dirName, "main_valid_check.tmp");

    // tmpFd = open(tmpValidCheckFile, O_WRONLY | O_CREAT, 0644);
    // if (tmpFd < 0) {
    //     printf("Image folder path is invalid\n%s\n", dirName);
    //     exit(-2);
    // }

    if (dirName[0] != '/') {
        printf("Warning: Provided path is not absolute. Make sure that `%s` contains the product images.\n", dirName);
    }

    close(tmpFd);
    unlink(tmpValidCheckFile);

    retVal = start(dirName);

    switch (retVal) {
    case 0:

        break;
    case -101:
        /* code */
        break;
    
    default:
        break;
    }

    return retVal;
}