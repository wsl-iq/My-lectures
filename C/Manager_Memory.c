// Manager memory in devices if mobile or desktop
#include <stdio.h>
#include <stdlib.h>
void* allocateMemory(size_t size) {
    void* ptr = malloc(size);
    if (ptr == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        exit(EXIT_FAILURE);
    }
    return ptr;
}
void freeMemory(void* ptr) {
    free(ptr);
}
int main() {
    size_t dataSize = 1024 * 1024; // 1 MB
    void* data = allocateMemory(dataSize);
    // Use the allocated memory for some operations
    // ...
    freeMemory(data);
    return 0;
}
