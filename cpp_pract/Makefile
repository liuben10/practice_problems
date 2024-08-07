invert_binary: invert_binary.cpp
	g++  -std=c++11 invert_binary.cpp -o invert_binary.exe

merge_sorted: merge_sorted.cpp
	g++  -std=c++11 merge_sorted.cpp -o merge_sorted.exe

max_depth: max_depth.cpp
	g++  -std=c++11 max_depth.cpp -o max_depth.exe

tree_util.o: tree_util.hpp
	g++  -std=c++11 tree_util.hpp

binary_tree_order: binary_tree_order.cpp tree_util.o
	g++  -std=c++11 binary_tree_order.cpp -o binary_tree_order.exe

triangle: triangle.cpp
	g++  -std=c++11 triangle.cpp -o triangle.exe

list_utils.o: list_utils.hpp
	g++  -std=c++11 list_util.hpp

remove_ll_elems: remove_ll_elems.cpp list_utils.o
	g++  -std=c++11 remove_ll_elems.cpp -o remove_ll_elems.exe
