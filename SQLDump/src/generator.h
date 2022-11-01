#ifndef GENERATOR_H
#define GENERATOR_H

#define DATASET_PATH    "../res/dataset.csv"
#define OUT_DUMP_PATH   "../out/eComDump.sql"

#define ATTR_ID         0
#define ATTR_NAME       1
#define ATTR_DESC       2
#define ATTR_PRICE      3
#endif

typedef struct _datasetItem {
    int id;
    char name[512];
    char desc[512];
    float price;
} DatasetItem;

int setupFd(int*, int*);
int mapDatasetFile(char**, int, int);
int extractDataset(char*, DatasetItem**, int);
int createDump(DatasetItem*, int, char*, int);
int start(char*);

int getNrNewLines(char*, int);

int _getRandomAvailability(int);
float _getRandomRating();