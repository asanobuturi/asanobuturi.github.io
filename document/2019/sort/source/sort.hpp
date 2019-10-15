#pragma once

#include <type_traits>
#include <iterator>
#include <array>
#include <queue>
#include <numeric>
#include <random>
#include <algorithm>

namespace {
  extern void* enabler;
}

namespace yk {

  template<class Iter>
  constexpr bool is_forward_iterator =
    std::is_base_of_v<std::forward_iterator_tag, typename std::iterator_traits<Iter>::iterator_category>;

  template<class Iter>
  constexpr bool is_bidirectinal_iterator =
    std::is_base_of_v<std::bidirectional_iterator_tag, typename std::iterator_traits<Iter>::iterator_category>;

  template<class Iter>
  constexpr bool is_random_access_iterator =
    std::is_base_of_v<std::random_access_iterator_tag, typename std::iterator_traits<Iter>::iterator_category>;

  template<class Iter, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void try_all(Iter first, Iter last) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    std::vector<size_t> indexes(std::distance(first, last));
    std::vector<value_type> cpy(first, last);
    std::iota(std::begin(indexes), std::end(indexes), 0);
    while (!std::is_sorted(first, last)) {
      std::next_permutation(std::begin(indexes), std::end(indexes));
      std::transform(std::begin(indexes), std::end(indexes), first, [&](size_t index) {return cpy[index]; });
    }
  }

  template<class Iter, class Comp, std::enable_if_t<is_bidirectinal_iterator<Iter>, void*&> = enabler>
  void quick_sort(Iter first, Iter last, Comp comp) {
    if (first == last)return;
    Iter left = first;
    Iter right = std::prev(last);
    if (left == right)return;
    const auto& pivot = *left;
    while (left != right) {
      while (left != right && comp(*left, pivot))++left;
      while (left != right && !comp(*right, pivot))--right;
      std::iter_swap(left, right);
    }
    if (first == left)++left;
    quick_sort(first, left, comp);
    quick_sort(left, last, comp);
  }

  template<class Iter, std::enable_if_t<is_bidirectinal_iterator<Iter>, void*&> = enabler>
  void quick_sort(Iter first, Iter last) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    quick_sort(first, last, std::less<value_type>{});
  }

  template<class Iter, class Comp, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void inplace_merge(Iter first, Iter mid, Iter last, Comp comp) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    if (first == mid || mid == last)return;
    size_t left = std::distance(first, mid);
    size_t right = std::distance(mid, last);
    if (left == 1 && right == 1) {
      if (comp(*std::next(first), *first))
        std::iter_swap(first, std::next(first));
      return;
    }
    value_type pivot =
      left < right ? *std::next(mid, right / 2)
      : *std::next(first, left / 2);
    if (!comp(*first, pivot) && !comp(*mid, pivot)) {
      if constexpr (is_bidirectinal_iterator<Iter>) {
        pivot = std::max(pivot, *std::prev(mid), comp);
        pivot = std::max(pivot, *std::prev(last), comp);
      }
      else {
        pivot = std::max(pivot, *std::next(first, left - 1), comp);
        pivot = std::max(pivot, *std::next(first, left + right - 1), comp);
      }
    }
    Iter lmid = std::lower_bound(first, mid, pivot, comp);
    Iter rmid = std::lower_bound(mid, last, pivot, comp);
    std::rotate(lmid, mid, rmid);
    Iter new_mid = std::lower_bound(first, last, pivot, comp);
    if (first == new_mid || new_mid == last)return;
    yk::inplace_merge(first, lmid, new_mid, comp);
    yk::inplace_merge(new_mid, rmid, last, comp);
  }

  template<class Iter, class Comp, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void inplace_merge_sort(Iter first, Iter last, Comp comp) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    size_t size = std::distance(first, last);
    if (size <= 1)return;
    auto mid = std::next(first, size / 2);
    inplace_merge_sort(first, mid, comp);
    inplace_merge_sort(mid, last, comp);
    yk::inplace_merge(first, mid, last, comp);
  }

  template<class Iter, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void inplace_merge_sort(Iter first, Iter last) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    inplace_merge_sort(first, last, std::less<value_type>{});
  }

  template<class Iter, class Comp, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void merge_sort(Iter first, Iter last, Comp comp) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    size_t size = std::distance(first, last);
    if (size <= 1)return;
    std::vector<value_type> storage(first, last);
    Iter mid = std::next(std::begin(storage), size / 2);
    merge_sort<Iter, Comp>(std::begin(storage), mid, comp);
    merge_sort<Iter, Comp>(mid, std::end(storage), comp);
    std::merge(std::begin(storage), mid, mid, std::end(storage), first);
  }

  template<class Iter, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void merge_sort(Iter first, Iter last) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    merge_sort(first, last, std::less<value_type>{});
  }

  template<class Iter, class Comp, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void bubble_sort(Iter first, Iter last, Comp comp) {
    while (first != last) {
      Iter itr1 = first, itr2 = std::next(first);
      for (; itr2 != last; ++itr1, ++itr2)
        if (!comp(*itr1, *itr2))std::iter_swap(itr1, itr2);
      last = itr1;
    }
  }

  template<class Iter, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void bubble_sort(Iter first, Iter last) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    bubble_sort(first, last, std::less<value_type>{});
  }

  template<class Iter, class Comp, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void insertion_sort(Iter first, Iter last, Comp comp) {
    for (Iter iter = first; iter != last; ++iter)
      std::rotate(std::lower_bound(first, iter, *iter), iter, std::next(iter));
  }

  template<class Iter, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void insertion_sort(Iter first, Iter last) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    insertion_sort(first, last, std::less<value_type>{});
  }

  template<class Iter, class Comp, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void selection_sort(Iter first, Iter last, Comp comp) {
    for (Iter iter = first; iter != last; ++iter)
      std::iter_swap(iter, std::min_element(iter, last));
  }

  template<class Iter, std::enable_if_t<is_forward_iterator<Iter>, void*&> = enabler>
  void selection_sort(Iter first, Iter last) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    selection_sort(first, last, std::less<value_type>{});
  }

  template<class Iter, std::enable_if_t<is_forward_iterator<Iter> && std::is_integral_v<typename std::iterator_traits<Iter>::value_type> && std::is_unsigned_v<typename std::iterator_traits<Iter>::value_type>, void*&> = enabler>
  void radix_sort(Iter first, Iter last) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    std::array<std::queue<value_type>, 256> buckets;
    int digits = std::numeric_limits<value_type>::digits >> 3;
    for (int d = 0; d < digits; ++d) {
      for (Iter iter = first; iter != last; ++iter)
        buckets[(*iter >> (d << 3)) & 0xff].emplace(std::move(*iter));
      Iter iter = first;
      for (auto& v : buckets) {
        if (iter == last)break;
        while (!v.empty()) {
          if (iter == last)break;
          *(iter++) = v.front();
          v.pop();
        }
      }
    }
  }

  template<class Iter, class Comp, std::enable_if_t<is_random_access_iterator <Iter>, void*&> = enabler>
  void bogo_sort(Iter first, Iter last, Comp comp) {
    std::mt19937 mt;
    while(!std::is_sorted(first,last,comp))
      std::shuffle(first, last, mt);
  }
  
  template<class Iter, std::enable_if_t<is_random_access_iterator <Iter>, void*&> = enabler>
  void bogo_sort(Iter first, Iter last) {
    using value_type = typename std::iterator_traits<Iter>::value_type;
    bogo_sort(first, last, std::less<value_type>{});
  }

}