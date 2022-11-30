#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <string.h>
#include <time.h>

#include "generator.h"

int getNrNewLines(char* data, int size) {
    int lines = 0;

    for (int i = 0; i < size; i++) {
        if (data[i] == '\n') {
            lines++;
        }
    }
    return lines;
}

int setupFd(int* datasetFd, int* outDumpFd) {
    *datasetFd = open(DATASET_PATH, O_RDONLY);
    if (*datasetFd < 0) {
        return -101;
    }
    
    *outDumpFd = open(OUT_DUMP_PATH, O_WRONLY | O_CREAT, 0644);
    if (*outDumpFd < 0) {
        return -102;
    }

    return 0;
}

int mapDatasetFile(char** dataset, int datasetSize, int datasetFd) {
    *dataset = (char*)mmap(NULL, datasetSize, PROT_READ | PROT_WRITE, MAP_PRIVATE, datasetFd, 0);
    if(*dataset == (void*)-1) {
        return -203;
    }

    return 0;
}

int extractDataset(char* dataset, DatasetItem** items, int nrItems) {
    char *row = NULL;
    int i = 0;

    row = strsep(&dataset, "\n");
    while((row = strsep(&dataset, "\n")) != NULL) {
        char *value = NULL;
        int attribute = ATTR_ID;
        char* rowCopy = row;

        while((value = strsep(&rowCopy, ";")) != NULL) {    
            if(attribute == ATTR_ID) {
                (*items)[i].id = atoi(value);
            }
            if(attribute == ATTR_NAME) {
                int enc = 0;
                for(int j = 0; j < 512; j++) {
                    if(value[j] == '"') {
                        enc++;
                    }
                    if (enc == 2) {
                        memset(value+j+1, '\0', 1);
                        break;
                    }
                }
                for(int j = 0; j < strlen(value); j++) {
                    if(value[j] == '\'') {
                        value[j] = '`';
                    }
                }
                value[0] = '\'';
                value[strlen(value) - 1] = '\'';
                memcpy((*items)[i].name, value, 512);
            }
            if(attribute == ATTR_DESC) {
                int enc = 0;
                for(int j = 0; j < 512; j++) {
                    if(value[j] == '"') {
                        enc++;
                    }
                    if (enc == 2) {
                        memset(value+j+1, '\0', 1);
                        break;
                    }
                }
                for(int j = 0; j < strlen(value); j++) {
                    if(value[j] == '\'') {
                        value[j] = '`';
                    }
                }
                value[0] = '\'';
                value[strlen(value) - 1] = '\'';
                memcpy((*items)[i].desc, value, 512);
            }
            if(attribute == ATTR_PRICE) {
                if (strcmp(value, "") == 0) {
                    (*items)[i].price = 250.0;
                } else {
                    (*items)[i].price = atof(value + 1);
                }
            }
            attribute++;
        }
        free(rowCopy);
        i++;
    }

    return 0;
}

int _getRandomAvailability(int price) {
    if(price == 250) {
        return rand() % 2;
    }
    return 1;
}

float _getRandomRating() {
    return (float)(rand() % 11)/ 2.0f;
}

int createDump(DatasetItem* items, int nrItems, char* dirPath, int outDumpFd) {
    srand(time(NULL));
    write(outDumpFd, "/*	SQL Dump Generator (Software Engineering 2022/2023)\n/*	Technical University of Cluj-Napoca\n/*\n/*	Author: Toader Eric-Stefan\n/*\n/*	29.10.2022\n/*\n/*	https://github.com/erictoader */\n\nSET NAMES utf8mb4;\n\n", 204);
    write(outDumpFd, "# Dump of table USER\n# ------------------------------------------------------------\n\nDROP TABLE IF EXISTS `USER`;\n\nCREATE TABLE `USER` (\n  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\n  `name` varchar(64),\n  `username` varchar(32) NOT NULL,\n  `password` varchar(32) NOT NULL,\n  `user_type` tinyint(1) unsigned NOT NULL DEFAULT '0',\n  `profile_picture` longblob,\n  `registration_date` int(14) DEFAULT '0',\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8;\n\n# Inserting into table\n# ------------------------------------------------------------\n\nINSERT INTO `USER` (`name`, `username`, `password`, `user_type`, `profile_picture`, `registration_date`)\nVALUES\n	('The Admin','admin','admin',0,NULL,0),\n	('Test Client','testclient','client',1,NULL,0),\n	('Test Seller','testseller','seller',2,NULL,0);\n\nUNLOCK TABLES;\n\n", 822);
    write(outDumpFd, "# Dump of table PRODUCT\n# ------------------------------------------------------------\n\nDROP TABLE IF EXISTS `PRODUCT`;\n\nCREATE TABLE `PRODUCT` (\n  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,\n  `name` varchar(512) NOT NULL,\n  `desc` varchar(512) NOT NULL,\n  `price` float unsigned NOT NULL,\n  `available` tinyint(1) unsigned NOT NULL DEFAULT '0',\n  `image` longblob,\n  `rating` float unsigned DEFAULT '0',\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8;\n\n# Inserting into table\n# ------------------------------------------------------------\n\n", 556);
    write(outDumpFd, "INSERT INTO `PRODUCT` (`id`, `name`, `desc`, `price`, `available`, `image`, `rating`)\nVALUES\n", 93);
    for (int i = 0; i < nrItems - 1; i++) {
        int available = _getRandomAvailability((int)items[i].price);
        float rating = _getRandomRating();
        char entry[1024];
        memset(entry, 0, 1024);
        snprintf(entry, 1024, "\t(%d,%s,%s,%.2f,%d,LOAD_FILE('%s/%d/Image_1.jpg'),%.1f),\n", items[i].id, items[i].name, items[i].desc, items[i].price, available, dirPath, i + 1, rating);
        write(outDumpFd, entry, strlen(entry));
    }
    int available = _getRandomAvailability((int)items[nrItems - 1].price);
    float rating = _getRandomRating();
    char entry[1024];
    memset(entry, 0, 1024);
    snprintf(entry, 1024, "\t(%d,%s,%s,%.2f,%d,LOAD_FILE('%s/%d/Image_1.jpg'),%.1f);\n\n", items[nrItems - 1].id, items[nrItems - 1].name, items[nrItems - 1].desc, items[nrItems - 1].price, available, dirPath, nrItems, rating);
    write(outDumpFd, entry, strlen(entry));

    write(outDumpFd, "UNLOCK TABLES;\n\n", 16);
    write(outDumpFd, "# Dump finished", 15);

    return 0;
}

// Call this if you have lost the images and the python script
void makePythonFile(DatasetItem* items, int nrItems) {
    int fd = open("download_script.py", O_WRONLY | O_CREAT, 0644);
    write(fd, "from bing_image_downloader import downloader\n\n", 46);
    write(fd, "def download_images():\n", 23);
    for(int i = 0; i < nrItems; i++) {
        char entry[1024];
        memset(entry, 0, 1024);
        snprintf(entry, 1024, "\tdownloader.download(%s, sequentialItem=%d, limit=1, output_dir=\"imgs\", force_replace=False, timeout=60)\n", items[i].name, i+1);
        write(fd, entry, strlen(entry));
    }
    write(fd, "\n\n", 2);
    write(fd, "if __name__ == '__main__':\n\tdownload_images()\n", 46);
    close(fd);
}

int start(char* dirPath) {
    int retVal = 0;
    int datasetFd;
    int outDumpFd;
    off_t datasetSize = 0;
    char *dataset = NULL;
    int nrItems;
    DatasetItem* items = NULL;

    if ((retVal = setupFd(&datasetFd, &outDumpFd)) < 0) {
        goto cleanup;
    }

    datasetSize = lseek(datasetFd, 0, SEEK_END);
    lseek(datasetFd, 0, SEEK_SET);

    if ((retVal = mapDatasetFile(&dataset, datasetSize, datasetFd)) < 0) {
        goto cleanup;
    }

    nrItems = getNrNewLines(dataset, datasetSize);
    items = (DatasetItem*)malloc(nrItems * sizeof(DatasetItem));
    for (int i = 0; i < nrItems; i++) {
        items[i].id = 0;
        items[i].price = 0.0f;
        memset(items[i].name, 0, 512);
        memset(items[i].desc, 0, 512);
    }

    if((retVal = extractDataset(dataset, &items, nrItems)) < 0) {
        goto cleanup;
    }

    if ((retVal = createDump(items, nrItems, dirPath, outDumpFd)) < 0) {
        goto cleanup;
    } 

    goto cleanup;

cleanup:
    close(datasetFd);
    close(outDumpFd);
    munmap(dataset, datasetSize);
    free(items);
    return retVal;
}