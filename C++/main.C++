#include <iostream>
#include <vector>
#include "optimization.cpp"

int main() {
    std::vector<int> data = {15, 25, 5, 10, 20};
    optimizeDataProcessing(data);
    return 0;
}
int CPU_Optimization();
int RAM_Optimization();
int main_optimizations() {
    CPU_Optimization();
    RAM_Optimization();
    return 0;
}
