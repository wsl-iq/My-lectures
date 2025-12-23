#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <execution>
void optimizeDataProcessing(std::vector<int>& data) {
    std::sort(std::execution::par, data.begin(), data.end());

    std::transform(std::execution::par, data.begin(), data.end(), data.begin(),
                   [](int value) { return value * 2; });

    int sum = std::reduce(std::execution::par, data.begin(), data.end(), 0);
    std::cout << "Sum of processed data: " << sum << std::endl;
}
int main() {
    std::vector<int> data = {5, 3, 8, 1, 2, 7, 4, 6};
    optimizeDataProcessing(data);
    return 0;
}

int CPU_Optimization() {
    std::vector<int> data = {10, 20, 30, 40, 50, 60, 70, 80};
    optimizeDataProcessing(data);
    return 0;
}

int RAM_Optimization() {
    std::vector<int> data(1000000);
    std::iota(data.begin(), data.end(), 1);
    optimizeDataProcessing(data);
    return 0;
}   