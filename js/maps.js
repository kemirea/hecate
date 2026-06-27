// Static game data: the set of maps and the fixed groups on each.
// Each map has a `requiredCount` (the map's target total; percentages are
// computed against it). Each group contains one or more placements; each
// PLACEMENT is `{ ref, x, y }` where `ref` is a monster id from the global
// catalog in js/monsters.js, and `x`/`y` are pixel coordinates (origin =
// top-left). Name + count come from the catalog. Clicking any dot selects the
// whole group.
//
// Groups are intentionally empty — build them in Placement mode, then use
// "Export groups" to paste the result back here.
window.MAPS = [
  {
    id: "everdawn",
    name: "Everdawn Grove",
    url: "maps/EverdawnGrove.webp",
    width: 2048,
    height: 1024,
    requiredCount: 110,
    groups: [
      { id: "g_gqujroa", name: "G1", monsters: [
        { id: "m_pb1do0l", ref: "desecrator", x: 1177, y: 715 },
        { id: "m_gxvjcar", ref: "outrunner", x: 1164, y: 712 },
        { id: "m_4xcf3qt", ref: "outrunner", x: 1174, y: 704 }
      ] },
      { id: "g_emgoxq2", name: "G2", monsters: [
        { id: "m_74eahls", ref: "blighted_dawnbloom", x: 1121, y: 725 },
        { id: "m_3mtwnbj", ref: "blighted_dawnbloom", x: 1109, y: 716 },
        { id: "m_zf5m5pt", ref: "skittershard", x: 1115, y: 704 },
        { id: "m_ogwuhlo", ref: "skittershard", x: 1126, y: 711 }
      ] },
      { id: "g_5lx0bnw", name: "G3", monsters: [
        { id: "m_2hlvph2", ref: "blighted_dawnbloom", x: 1228, y: 630 },
        { id: "m_a97o9ds", ref: "blighted_dawnbloom", x: 1224, y: 642 },
        { id: "m_2xpejfb", ref: "outrunner", x: 1216, y: 626 },
        { id: "m_avoxuhv", ref: "outrunner", x: 1213, y: 637 }
      ] },
      { id: "g_2q9ejyc", name: "G4", monsters: [
        { id: "m_bdx576c", ref: "outrunner", x: 1175, y: 500 },
        { id: "m_qt9oy0p", ref: "outrunner", x: 1187, y: 506 },
        { id: "m_y5jacnn", ref: "mangy_brute", x: 1181, y: 487 },
        { id: "m_68ek76v", ref: "mangy_brute", x: 1190, y: 493 }
      ] },
      { id: "g_iuwxi9l", name: "G5", monsters: [
        { id: "m_m17q4zs", ref: "skittershard", x: 1143, y: 626 },
        { id: "m_km9wmmt", ref: "skittershard", x: 1158, y: 627 },
        { id: "m_yafwm84", ref: "skittershard", x: 1150, y: 638 }
      ] },
      { id: "g_y11ayy6", name: "G6", monsters: [] },
      { id: "g_3za5j25", name: "G7", monsters: [
        { id: "m_eqwumaf", ref: "outrunner", x: 1103, y: 638 },
        { id: "m_75iya5k", ref: "outrunner", x: 1099, y: 645 },
        { id: "m_9p78y26", ref: "mangy_brute", x: 1099, y: 629 },
        { id: "m_p4bkg52", ref: "mangy_brute", x: 1093, y: 650 },
        { id: "m_u7c624w", ref: "mangy_brute", x: 1085, y: 651 }
      ] },
      { id: "g_xutj483", name: "G8", monsters: [
        { id: "m_9scmwx5", ref: "mangy_brute", x: 1044, y: 640 }
      ] },
      { id: "g_81wcaov", name: "G9", monsters: [
        { id: "m_4zg5vfc", ref: "skittershard", x: 1033, y: 602 },
        { id: "m_p0lnrxb", ref: "skittershard", x: 1029, y: 610 },
        { id: "m_dafiaqv", ref: "skittershard", x: 1022, y: 599 },
        { id: "m_ln5bnwq", ref: "skittershard", x: 1019, y: 606 },
        { id: "m_79ju32s", ref: "skittershard", x: 1014, y: 598 }
      ] },
      { id: "g_11ojn1y", name: "G10", monsters: [
        { id: "m_4cei4z3", ref: "mangy_brute", x: 969, y: 630 },
        { id: "m_z8l4462", ref: "mangy_brute", x: 958, y: 631 }
      ] },
      { id: "g_ce9360d", name: "G11", monsters: [
        { id: "m_1bnl11z", ref: "outrunner", x: 1061, y: 516 },
        { id: "m_6wv7c2w", ref: "outrunner", x: 1052, y: 519 },
        { id: "m_ggfin3c", ref: "outrunner", x: 1052, y: 529 }
      ] },
      { id: "g_5jx1p1a", name: "G12", monsters: [
        { id: "m_hiu0vli", ref: "desecrator", x: 968, y: 548 },
        { id: "m_f1dk9ee", ref: "mangy_brute", x: 959, y: 544 },
        { id: "m_lkzf819", ref: "mangy_brute", x: 976, y: 544 }
      ] },
      { id: "g_0e87ojh", name: "G13", monsters: [
        { id: "m_ih0fcdp", ref: "mangy_brute", x: 988, y: 516 },
        { id: "m_0yla4te", ref: "mangy_brute", x: 979, y: 516 },
        { id: "m_wadnt5f", ref: "mangy_brute", x: 982, y: 507 }
      ] },
      { id: "g_tc7cw2r", name: "G14", monsters: [
        { id: "m_3gj677i", ref: "outrunner", x: 931, y: 532 },
        { id: "m_uawv5ii", ref: "outrunner", x: 925, y: 540 },
        { id: "m_nv20p5z", ref: "outrunner", x: 921, y: 548 },
        { id: "m_tonxp53", ref: "outrunner", x: 935, y: 543 },
        { id: "m_46ozot4", ref: "mangy_brute", x: 929, y: 551 }
      ] },
      { id: "g_qnwppop", name: "G15", monsters: [
        { id: "m_xffwyze", ref: "desecrator", x: 964, y: 455 },
        { id: "m_mtyzxfz", ref: "desecrator", x: 953, y: 455 },
        { id: "m_e926ajr", ref: "desecrator", x: 942, y: 454 }
      ] },
      { id: "g_1a4x7u1", name: "G16", monsters: [
        { id: "m_g86k5l5", ref: "gorestained_butcher", x: 890, y: 476 },
        { id: "m_za4z6qg", ref: "outrunner", x: 900, y: 480 },
        { id: "m_xlzpczn", ref: "outrunner", x: 891, y: 486 }
      ] },
      { id: "g_3mr1d0k", name: "G17", monsters: [
        { id: "m_7bejrwq", ref: "gorestained_butcher", x: 954, y: 596 },
        { id: "m_z6h50jb", ref: "outrunner", x: 942, y: 589 },
        { id: "m_yowsxlj", ref: "outrunner", x: 943, y: 601 }
      ] },
      { id: "g_6b35bgk", name: "G18", monsters: [
        { id: "m_afcn86w", ref: "mangy_brute", x: 907, y: 634 },
        { id: "m_g0c2f2k", ref: "corrupted_totemic", x: 908, y: 621 },
        { id: "m_kgbvs4x", ref: "desecrator", x: 889, y: 626 },
        { id: "m_r11y7s6", ref: "outrunner", x: 899, y: 618 },
        { id: "m_9mr2uau", ref: "outrunner", x: 895, y: 636 }
      ] },
      { id: "g_g14vgzy", name: "G19", monsters: [
        { id: "m_cmjrjz8", ref: "horned_seer", x: 832, y: 661 },
        { id: "m_gi9do7f", ref: "mangy_brute", x: 821, y: 653 },
        { id: "m_99ipcaw", ref: "mangy_brute", x: 815, y: 661 },
        { id: "m_85x9how", ref: "mangy_brute", x: 822, y: 668 }
      ] },
      { id: "g_7lvcpma", name: "G20", monsters: [
        { id: "m_441egm2", ref: "corrupted_totemic", x: 767, y: 685 },
        { id: "m_xj8qp2k", ref: "mangy_brute", x: 757, y: 678 },
        { id: "m_mxxijpr", ref: "mangy_brute", x: 766, y: 675 },
        { id: "m_uofiwli", ref: "mangy_brute", x: 775, y: 680 },
        { id: "m_knuxjqo", ref: "mangy_brute", x: 775, y: 690 }
      ] },
      { id: "g_d2hana0", name: "G21", monsters: [
        { id: "m_isepsiw", ref: "outrunner", x: 832, y: 579 },
        { id: "m_dwxbr6l", ref: "outrunner", x: 842, y: 582 },
        { id: "m_nnxqr8a", ref: "outrunner", x: 835, y: 590 }
      ] },
      { id: "g_vzuopuz", name: "G22", monsters: [
        { id: "m_g2kjr43", ref: "outrunner", x: 751, y: 637 },
        { id: "m_q83qerq", ref: "outrunner", x: 742, y: 634 },
        { id: "m_8lugw7p", ref: "outrunner", x: 744, y: 645 }
      ] },
      { id: "g_8q71xaq", name: "G23", monsters: [
        { id: "m_p9lj7xv", ref: "skittershard", x: 768, y: 580 },
        { id: "m_i1vhxku", ref: "skittershard", x: 780, y: 577 },
        { id: "m_ami8tjg", ref: "skittershard", x: 773, y: 590 },
        { id: "m_vbailyv", ref: "skittershard", x: 784, y: 588 }
      ] },
      { id: "g_wragdyq", name: "G24", monsters: [
        { id: "m_yqb734q", ref: "horned_seer", x: 716, y: 572 },
        { id: "m_nqat9oi", ref: "horned_seer", x: 723, y: 582 }
      ] },
      { id: "g_rk5po90", name: "G25", monsters: [
        { id: "m_ryv1cdx", ref: "skittershard", x: 750, y: 538 },
        { id: "m_fndqy5r", ref: "skittershard", x: 762, y: 540 },
        { id: "m_fevwy3x", ref: "skittershard", x: 755, y: 548 }
      ] },
      { id: "g_4ps77il", name: "G26", monsters: [
        { id: "m_pv0rcc5", ref: "desecrator", x: 813, y: 529 },
        { id: "m_dcm2ici", ref: "desecrator", x: 820, y: 537 },
        { id: "m_9w5943x", ref: "mangy_brute", x: 821, y: 521 },
        { id: "m_ln58n7t", ref: "mangy_brute", x: 828, y: 529 }
      ] },
      { id: "g_cdk8ai6", name: "G27", monsters: [
        { id: "m_f7mwvjr", ref: "gorestained_butcher", x: 791, y: 502 },
        { id: "m_tlijw6v", ref: "outrunner", x: 780, y: 495 },
        { id: "m_3x8hsxe", ref: "outrunner", x: 793, y: 492 },
        { id: "m_93poe2m", ref: "outrunner", x: 801, y: 500 }
      ] },
      { id: "g_e0n025g", name: "G28", monsters: [
        { id: "m_2b0so4k", ref: "corrupted_totemic", x: 684, y: 492 },
        { id: "m_b9l2ydg", ref: "mangy_brute", x: 693, y: 489 },
        { id: "m_qk1okzp", ref: "mangy_brute", x: 685, y: 503 }
      ] },
      { id: "g_39d45w8", name: "G29", monsters: [
        { id: "m_w8wzg8h", ref: "outrunner", x: 743, y: 456 },
        { id: "m_cna4a7j", ref: "outrunner", x: 730, y: 456 }
      ] },
      { id: "g_eqofr7j", name: "G30", monsters: [
        { id: "m_r3jhkeq", ref: "outrunner", x: 773, y: 427 },
        { id: "m_1c07jpw", ref: "outrunner", x: 770, y: 437 },
        { id: "m_raaa4oa", ref: "mangy_brute", x: 761, y: 428 }
      ] },
      { id: "g_wmtdxky", name: "G31", monsters: [
        { id: "m_6hv8yns", ref: "skittershard", x: 702, y: 400 },
        { id: "m_33g7ohr", ref: "skittershard", x: 712, y: 407 }
      ] },
      { id: "g_frl91se", name: "G32", monsters: [
        { id: "m_7gwdpwf", ref: "bloodstone_goliath", x: 750, y: 368 },
        { id: "m_oqhpmc3", ref: "horned_seer", x: 740, y: 374 },
        { id: "m_gb83cd2", ref: "horned_seer", x: 753, y: 377 },
        { id: "m_4wevle5", ref: "skittershard", x: 726, y: 377 },
        { id: "m_b4s4npq", ref: "skittershard", x: 734, y: 383 },
        { id: "m_ki130qc", ref: "skittershard", x: 744, y: 387 },
        { id: "m_cb70es2", ref: "skittershard", x: 756, y: 387 }
      ] },
      { id: "g_8jjjeht", name: "G33", monsters: [
        { id: "m_pncwgkn", ref: "mangy_brute", x: 780, y: 248 },
        { id: "m_6yexkoz", ref: "mangy_brute", x: 771, y: 247 },
        { id: "m_hm4kqpc", ref: "mangy_brute", x: 774, y: 257 }
      ] },
      { id: "g_q3onrzp", name: "G34", monsters: [
        { id: "m_blz7rh5", ref: "skittershard", x: 740, y: 245 },
        { id: "m_t3y0zba", ref: "skittershard", x: 734, y: 252 },
        { id: "m_cj8ritn", ref: "skittershard", x: 740, y: 260 },
        { id: "m_jwth7al", ref: "skittershard", x: 747, y: 255 }
      ] },
      { id: "g_0zsv107", name: "G35", monsters: [
        { id: "m_t58871n", ref: "desecrator", x: 715, y: 225 },
        { id: "m_k4e4xf3", ref: "desecrator", x: 704, y: 226 },
        { id: "m_nyafoba", ref: "mangy_brute", x: 714, y: 215 },
        { id: "m_wfjq6x4", ref: "mangy_brute", x: 703, y: 215 }
      ] },
      { id: "g_hety0ts", name: "G36", monsters: [
        { id: "m_w4yfrxa", ref: "gorestained_butcher", x: 736, y: 161 },
        { id: "m_9o0j959", ref: "horned_seer", x: 728, y: 169 },
        { id: "m_56e3emq", ref: "desecrator", x: 745, y: 152 },
        { id: "m_axbgzli", ref: "mangy_brute", x: 733, y: 177 },
        { id: "m_3ca6qjc", ref: "mangy_brute", x: 743, y: 174 },
        { id: "m_o92im3k", ref: "mangy_brute", x: 751, y: 164 },
        { id: "m_kalebrz", ref: "mangy_brute", x: 755, y: 155 }
      ] },
      { id: "g_m6ltdqs", name: "G37", monsters: [
        { id: "m_hgk8ozz", ref: "mangy_brute", x: 833, y: 207 },
        { id: "m_vbvtiaz", ref: "mangy_brute", x: 831, y: 215 },
        { id: "m_hcjixk5", ref: "desecrator", x: 821, y: 205 },
        { id: "m_8y71vxl", ref: "desecrator", x: 819, y: 214 }
      ] },
      { id: "g_h52nxby", name: "G38", monsters: [
        { id: "m_i4qqsb8", ref: "skittershard", x: 860, y: 246 },
        { id: "m_8eu4o1x", ref: "skittershard", x: 851, y: 243 },
        { id: "m_c4k4ybd", ref: "skittershard", x: 849, y: 253 },
        { id: "m_si5n1sv", ref: "skittershard", x: 859, y: 256 }
      ] },
      { id: "g_veaqsj5", name: "G39", monsters: [
        { id: "m_kyt7aur", ref: "skittershard", x: 868, y: 184 },
        { id: "m_ighaxnb", ref: "skittershard", x: 863, y: 192 },
        { id: "m_w3cr7bw", ref: "blighted_dawnbloom", x: 860, y: 178 },
        { id: "m_9oghxgq", ref: "blighted_dawnbloom", x: 855, y: 186 }
      ] },
      { id: "g_xvplmm2", name: "G40", monsters: [
        { id: "m_fuhxq4t", ref: "bloodstone_goliath", x: 844, y: 309 },
        { id: "m_lbu4uy8", ref: "skittershard", x: 837, y: 300 },
        { id: "m_dad4drd", ref: "skittershard", x: 847, y: 297 },
        { id: "m_185ne6k", ref: "skittershard", x: 856, y: 303 },
        { id: "m_cmpowm9", ref: "skittershard", x: 854, y: 312 }
      ] },
      { id: "g_57tg5cn", name: "G41", monsters: [
        { id: "m_4xvlujh", ref: "corrupted_totemic", x: 825, y: 350 },
        { id: "m_2tmjzn3", ref: "mangy_brute", x: 835, y: 345 },
        { id: "m_98v3v9s", ref: "mangy_brute", x: 825, y: 340 }
      ] },
      { id: "g_jyfd0j7", name: "G42", monsters: [
        { id: "m_2lhsovv", ref: "mangy_brute", x: 894, y: 296 },
        { id: "m_a1eukwu", ref: "mangy_brute", x: 904, y: 293 },
        { id: "m_4xlx11w", ref: "horned_seer", x: 906, y: 306 }
      ] },
      { id: "g_fq4t4lz", name: "G43", monsters: [
        { id: "m_bpxf8zt", ref: "outrunner", x: 912, y: 240 },
        { id: "m_qodcp29", ref: "outrunner", x: 925, y: 242 },
        { id: "m_xs1iktg", ref: "mangy_brute", x: 913, y: 228 },
        { id: "m_vkuaf0z", ref: "mangy_brute", x: 926, y: 230 }
      ] },
      { id: "g_4wf814s", name: "G44", monsters: [
        { id: "m_fbejb0r", ref: "bloodstone_goliath", x: 1027, y: 168 },
        { id: "m_gltz2vs", ref: "skittershard", x: 1026, y: 157 },
        { id: "m_5d730ks", ref: "skittershard", x: 1034, y: 160 },
        { id: "m_i1u19om", ref: "skittershard", x: 1035, y: 168 },
        { id: "m_1s4x0f1", ref: "skittershard", x: 1031, y: 175 }
      ] },
      { id: "g_atz8kmd", name: "G45", monsters: [
        { id: "m_gp5z45a", ref: "desecrator", x: 1035, y: 111 },
        { id: "m_r70yzon", ref: "mangy_brute", x: 1030, y: 121 },
        { id: "m_y28n3jh", ref: "mangy_brute", x: 1041, y: 122 },
        { id: "m_i2x9xs8", ref: "mangy_brute", x: 1048, y: 113 }
      ] },
      { id: "g_gjydvu4", name: "G46", monsters: [
        { id: "m_lbww2os", ref: "desecrator", x: 1091, y: 82 },
        { id: "m_sdwx2mw", ref: "corrupted_totemic", x: 1101, y: 81 },
        { id: "m_8dx4s7q", ref: "mangy_brute", x: 1088, y: 92 },
        { id: "m_0hruh0k", ref: "mangy_brute", x: 1106, y: 93 }
      ] },
      { id: "g_88mwrki", name: "G47", monsters: [
        { id: "m_2mryhj5", ref: "skittershard", x: 1086, y: 139 },
        { id: "m_0lnnum8", ref: "skittershard", x: 1089, y: 149 },
        { id: "m_3bl062s", ref: "skittershard", x: 1092, y: 160 },
        { id: "m_ugvlzec", ref: "skittershard", x: 1098, y: 141 },
        { id: "m_hmpqbjm", ref: "skittershard", x: 1099, y: 150 }
      ] },
      { id: "g_31b4oyd", name: "G48", monsters: [
        { id: "m_4ax9cs1", ref: "outrunner", x: 1182, y: 146 },
        { id: "m_9hzvtzq", ref: "outrunner", x: 1187, y: 157 },
        { id: "m_rquy8jc", ref: "outrunner", x: 1194, y: 148 }
      ] },
      { id: "g_g7zpyen", name: "G49", monsters: [
        { id: "m_06x9f5d", ref: "outrunner", x: 1148, y: 225 },
        { id: "m_e8r7ogj", ref: "horned_seer", x: 1152, y: 215 },
        { id: "m_lkdrihq", ref: "desecrator", x: 1148, y: 202 },
        { id: "m_s79pkz1", ref: "mangy_brute", x: 1141, y: 212 },
        { id: "m_o8qv09s", ref: "mangy_brute", x: 1139, y: 222 }
      ] },
      { id: "g_f3ri6xx", name: "G50", monsters: [
        { id: "m_6awraaq", ref: "desecrator", x: 1146, y: 278 },
        { id: "m_c1784z0", ref: "desecrator", x: 1140, y: 288 }
      ] },
      { id: "g_i6czzoj", name: "G51", monsters: [
        { id: "m_njz50f5", ref: "desecrator", x: 1132, y: 325 }
      ] },
      { id: "g_zd6s9tl", name: "G52", monsters: [
        { id: "m_3qa2cyy", ref: "blighted_dawnbloom", x: 1007, y: 310 },
        { id: "m_mutlayh", ref: "blighted_dawnbloom", x: 1013, y: 319 },
        { id: "m_nn5nqmc", ref: "skittershard", x: 1010, y: 298 },
        { id: "m_aw4n7d5", ref: "skittershard", x: 1019, y: 301 },
        { id: "m_3nxir42", ref: "skittershard", x: 1028, y: 304 },
        { id: "m_9zrysl5", ref: "skittershard", x: 1018, y: 310 },
        { id: "m_53n7u22", ref: "skittershard", x: 1026, y: 312 },
        { id: "m_7feqjro", ref: "skittershard", x: 1024, y: 320 }
      ] },
      { id: "g_q8eh3xe", name: "G53", monsters: [
        { id: "m_ptz1ui9", ref: "gorestained_butcher", x: 1059, y: 329 },
        { id: "m_it9rpv6", ref: "outrunner", x: 1054, y: 339 },
        { id: "m_bfkzik9", ref: "outrunner", x: 1064, y: 341 },
        { id: "m_jrs5kzp", ref: "outrunner", x: 1069, y: 329 }
      ] },
      { id: "g_y9rio37", name: "G54", monsters: [
        { id: "m_9olikp5", ref: "outrunner", x: 1133, y: 370 },
        { id: "m_xf29y3o", ref: "outrunner", x: 1134, y: 381 },
        { id: "m_dlqdeuc", ref: "outrunner", x: 1135, y: 392 },
        { id: "m_h84dn45", ref: "outrunner", x: 1142, y: 403 }
      ] },
      { id: "g_t7tl6l1", name: "G55", monsters: [
        { id: "m_9f962wr", ref: "skittershard", x: 1109, y: 412 },
        { id: "m_zwj2s79", ref: "skittershard", x: 1118, y: 414 },
        { id: "m_697xbnb", ref: "skittershard", x: 1099, y: 418 },
        { id: "m_xjbgbm4", ref: "skittershard", x: 1107, y: 422 },
        { id: "m_f15uvh0", ref: "skittershard", x: 1116, y: 426 }
      ] },
      { id: "g_8t87pzr", name: "G56", monsters: [
        { id: "m_qbxv6iw", ref: "gorestained_butcher", x: 1197, y: 349 },
        { id: "m_ow2oy31", ref: "blighted_dawnbloom", x: 1187, y: 345 },
        { id: "m_k6as17z", ref: "outrunner", x: 1196, y: 338 },
        { id: "m_0akb9hf", ref: "outrunner", x: 1184, y: 353 },
        { id: "m_hsdiug5", ref: "mangy_brute", x: 1192, y: 359 }
      ] },
      { id: "g_gcba5fc", name: "G57", monsters: [
        { id: "m_547rsz4", ref: "mangy_brute", x: 1249, y: 310 },
        { id: "m_v5djr4o", ref: "mangy_brute", x: 1254, y: 320 }
      ] },
      { id: "g_4z16j4u", name: "G58", monsters: [
        { id: "m_23jknqy", ref: "mangy_brute", x: 1289, y: 353 },
        { id: "m_ozqshci", ref: "mangy_brute", x: 1291, y: 363 },
        { id: "m_l95efc3", ref: "mangy_brute", x: 1279, y: 356 },
        { id: "m_ftuf2ex", ref: "mangy_brute", x: 1281, y: 366 },
        { id: "m_5y7dkk5", ref: "gorestained_butcher", x: 1281, y: 344 }
      ] },
      { id: "g_zcjn09a", name: "G59", monsters: [
        { id: "m_i33arvs", ref: "skittershard", x: 1220, y: 395 },
        { id: "m_sies8rj", ref: "skittershard", x: 1232, y: 394 },
        { id: "m_7w36kk3", ref: "skittershard", x: 1224, y: 404 },
        { id: "m_2nx78u3", ref: "skittershard", x: 1235, y: 404 }
      ] },
      { id: "g_5mpjfzo", name: "G60", monsters: [
        { id: "m_97g0lwc", ref: "desecrator", x: 1272, y: 416 },
        { id: "m_a83r1lw", ref: "desecrator", x: 1286, y: 416 }
      ] },
      { id: "g_t1omvo8", name: "G61", monsters: [
        { id: "m_pg2oshg", ref: "skittershard", x: 1281, y: 461 },
        { id: "m_5dj7mw1", ref: "skittershard", x: 1286, y: 472 },
        { id: "m_98bsc2f", ref: "skittershard", x: 1276, y: 469 }
      ] }
    ]
  },
  {
    id: "sailors",
    name: "Sailor's Abyss",
    url: "maps/SailorsAbyss.webp",
    width: 2048,
    height: 1024,
    requiredCount: 131,
    groups: [
      { id: "g_9jwzbyb", name: "G1", monsters: [
        { id: "m_xlhaqrh", ref: "fading_raider", x: 1045, y: 210 },
        { id: "m_jrhz8sq", ref: "fading_raider", x: 1055, y: 212 }
      ] },
      { id: "g_d350bs4", name: "G2", monsters: [
        { id: "m_e04q61n", ref: "fading_raider", x: 1032, y: 235 },
        { id: "m_ip1duvp", ref: "fading_raider", x: 1051, y: 238 },
        { id: "m_raadif9", ref: "vengeful_shade", x: 1035, y: 242 },
        { id: "m_lf23pc1", ref: "vengeful_shade", x: 1042, y: 243 }
      ] },
      { id: "g_9ijf6d2", name: "G3", monsters: [
        { id: "m_upeov92", ref: "fading_raider", x: 979, y: 267 },
        { id: "m_j3hm7j2", ref: "fading_raider", x: 985, y: 275 }
      ] },
      { id: "g_ltd2m44", name: "G4", monsters: [
        { id: "m_q3lrxcf", ref: "vengeful_shade", x: 916, y: 304 },
        { id: "m_0ppdyg6", ref: "vengeful_shade", x: 921, y: 314 },
        { id: "m_02etsib", ref: "lost_soul", x: 920, y: 293 },
        { id: "m_4jonmw3", ref: "lost_soul", x: 926, y: 304 },
        { id: "m_zru5g1i", ref: "lost_soul", x: 933, y: 316 }
      ] },
      { id: "g_wm4sgio", name: "G5", monsters: [
        { id: "m_ht1w5yv", ref: "lost_soul", x: 823, y: 308 },
        { id: "m_aqx68gc", ref: "lost_soul", x: 820, y: 318 },
        { id: "m_ws4bumq", ref: "fading_raider", x: 833, y: 310 },
        { id: "m_v5sf3oe", ref: "fading_raider", x: 830, y: 320 }
      ] },
      { id: "g_dz281xo", name: "G6", monsters: [
        { id: "m_ysmgu80", ref: "lost_soul", x: 850, y: 375 },
        { id: "m_kehx8jh", ref: "lost_soul", x: 856, y: 386 },
        { id: "m_4qbnhxp", ref: "lost_soul", x: 846, y: 386 },
        { id: "m_v8g8wjb", ref: "vengeful_shade", x: 850, y: 396 },
        { id: "m_w6cr2ah", ref: "vengeful_shade", x: 861, y: 398 }
      ] },
      { id: "g_wgrbs6g", name: "G7", monsters: [
        { id: "m_n337y6y", ref: "tormented_spectre", x: 733, y: 392 },
        { id: "m_ulnxymp", ref: "tormented_spectre", x: 734, y: 403 },
        { id: "m_p5rhure", ref: "fading_raider", x: 743, y: 390 },
        { id: "m_lxsc3yh", ref: "fading_raider", x: 744, y: 402 }
      ] },
      { id: "g_seo73kz", name: "G8", monsters: [
        { id: "m_1864wr9", ref: "fading_raider", x: 718, y: 483 },
        { id: "m_rtec2uk", ref: "lost_soul", x: 723, y: 477 },
        { id: "m_4mrxt4y", ref: "lost_soul", x: 728, y: 468 }
      ] },
      { id: "g_1wxj63u", name: "G9", monsters: [
        { id: "m_u3aopso", ref: "dire_rat", x: 656, y: 532 },
        { id: "m_84kmi24", ref: "dire_rat", x: 657, y: 521 },
        { id: "m_zc6klsg", ref: "dire_rat", x: 661, y: 511 },
        { id: "m_5fgiu4n", ref: "dire_rat", x: 668, y: 518 },
        { id: "m_k1dd30l", ref: "dire_rat", x: 666, y: 526 }
      ] },
      { id: "g_25aktrl", name: "G10", monsters: [
        { id: "m_zkmc0sq", ref: "witchreef_lasher", x: 699, y: 594 },
        { id: "m_8u80w6e", ref: "witchreef_lasher", x: 705, y: 601 },
        { id: "m_71518fc", ref: "witchreef_lasher", x: 709, y: 593 }
      ] },
      { id: "g_383pzmx", name: "G11", monsters: [
        { id: "m_pkojcti", ref: "witchreef_lasher", x: 645, y: 660 },
        { id: "m_n7ma1w6", ref: "witchreef_lasher", x: 643, y: 672 },
        { id: "m_ecikiux", ref: "witchreef_lasher", x: 651, y: 666 }
      ] },
      { id: "g_25y3tn9", name: "G12", monsters: [
        { id: "m_iv9dysy", ref: "witchreef_lasher", x: 648, y: 709 },
        { id: "m_1tmrnir", ref: "witchreef_lasher", x: 654, y: 719 },
        { id: "m_x783gsp", ref: "witchreef_lasher", x: 656, y: 710 }
      ] },
      { id: "g_dmte8xu", name: "G13", monsters: [
        { id: "m_1cspzq1", ref: "witchreef_lasher", x: 700, y: 696 },
        { id: "m_0jk23qg", ref: "witchreef_lasher", x: 700, y: 706 },
        { id: "m_y87z6fr", ref: "witchreef_lasher", x: 709, y: 705 }
      ] },
      { id: "g_h35ih8r", name: "G14", monsters: [
        { id: "m_yi6ufip", ref: "deepbound_magi", x: 660, y: 626 },
        { id: "m_yabtjnm", ref: "vengeful_shade", x: 653, y: 615 },
        { id: "m_2hnu0yh", ref: "vengeful_shade", x: 667, y: 616 }
      ] },
      { id: "g_qv6kvts", name: "G15", monsters: [
        { id: "m_kpc9ayb", ref: "lost_soul", x: 707, y: 652 },
        { id: "m_vpwbpgk", ref: "lost_soul", x: 716, y: 654 },
        { id: "m_unhsi6h", ref: "lost_soul", x: 710, y: 661 }
      ] },
      { id: "g_ufzcswo", name: "G16", monsters: [
        { id: "m_ev250ip", ref: "water_elemental", x: 690, y: 745 }
      ] },
      { id: "g_5w1fm2m", name: "G17", monsters: [
        { id: "m_wv9q1wc", ref: "witchreef_lasher", x: 667, y: 778 },
        { id: "m_uowy98w", ref: "witchreef_lasher", x: 676, y: 780 }
      ] },
      { id: "g_v9wre3x", name: "G18", monsters: [
        { id: "m_lu4dtto", ref: "witchreef_lasher", x: 738, y: 749 },
        { id: "m_neq3i6c", ref: "witchreef_lasher", x: 746, y: 755 }
      ] },
      { id: "g_31ecbh9", name: "G19", monsters: [
        { id: "m_qmzcqha", ref: "water_elemental", x: 768, y: 792 }
      ] },
      { id: "g_uk2kfzk", name: "G20", monsters: [
        { id: "m_jth991s", ref: "tormented_spectre", x: 826, y: 829 },
        { id: "m_tnpf9uh", ref: "tormented_spectre", x: 819, y: 836 },
        { id: "m_rlxbjpf", ref: "tormented_spectre", x: 828, y: 838 },
        { id: "m_5zxikwl", ref: "lost_soul", x: 820, y: 823 },
        { id: "m_6md88w6", ref: "lost_soul", x: 812, y: 827 },
        { id: "m_7o0ri53", ref: "lost_soul", x: 810, y: 835 },
        { id: "m_vudp0p8", ref: "lost_soul", x: 814, y: 842 }
      ] },
      { id: "g_4xta0s4", name: "G21", monsters: [
        { id: "m_h0r7848", ref: "fading_raider", x: 920, y: 846 },
        { id: "m_y5h1ffk", ref: "fading_raider", x: 921, y: 857 }
      ] },
      { id: "g_510024k", name: "G22", monsters: [
        { id: "m_roflyex", ref: "fading_raider", x: 938, y: 842 },
        { id: "m_ffdcj6z", ref: "fading_raider", x: 942, y: 852 }
      ] },
      { id: "g_od3ra0y", name: "G23", monsters: [
        { id: "m_nbp6qa9", ref: "hollowed_corsair", x: 1008, y: 764 },
        { id: "m_0d3jz9g", ref: "hollowed_corsair", x: 1023, y: 767 },
        { id: "m_rfe2tkl", ref: "lost_soul", x: 998, y: 763 },
        { id: "m_ji9490a", ref: "lost_soul", x: 1002, y: 770 },
        { id: "m_ltw7zzx", ref: "lost_soul", x: 1012, y: 773 },
        { id: "m_u1sfj9e", ref: "lost_soul", x: 1021, y: 775 },
        { id: "m_crgktvw", ref: "lost_soul", x: 1028, y: 772 },
        { id: "m_mybtw35", ref: "fading_raider", x: 1004, y: 777 },
        { id: "m_auijtxn", ref: "fading_raider", x: 1014, y: 782 },
        { id: "m_3293qcr", ref: "fading_raider", x: 1006, y: 783 }
      ] },
      { id: "g_kb1343t", name: "G24", monsters: [
        { id: "m_b2aqf6t", ref: "vengeful_shade", x: 897, y: 697 },
        { id: "m_yrsm2dl", ref: "lost_soul", x: 900, y: 688 },
        { id: "m_4cug5q4", ref: "lost_soul", x: 905, y: 695 }
      ] },
      { id: "g_kacc15z", name: "G25", monsters: [
        { id: "m_fbls2ss", ref: "lost_soul", x: 859, y: 583 },
        { id: "m_z0i18ed", ref: "lost_soul", x: 870, y: 580 },
        { id: "m_r8vcwek", ref: "lost_soul", x: 865, y: 595 },
        { id: "m_ystfc81", ref: "lost_soul", x: 873, y: 602 },
        { id: "m_27b7z2r", ref: "fading_raider", x: 867, y: 587 },
        { id: "m_1vy8phy", ref: "fading_raider", x: 874, y: 592 },
        { id: "m_9pfux0w", ref: "fading_raider", x: 856, y: 591 },
        { id: "m_y2juqq6", ref: "fading_raider", x: 857, y: 599 }
      ] },
      { id: "g_d0czycv", name: "G26", monsters: [
        { id: "m_5e8vhtf", ref: "tormented_spectre", x: 1170, y: 580 },
        { id: "m_lozr5uw", ref: "witchreef_lasher", x: 1171, y: 569 },
        { id: "m_ps3w4db", ref: "witchreef_lasher", x: 1178, y: 575 },
        { id: "m_d8bep31", ref: "lost_soul", x: 1162, y: 575 },
        { id: "m_jx0fnbx", ref: "lost_soul", x: 1163, y: 584 },
        { id: "m_cddifs1", ref: "lost_soul", x: 1178, y: 585 }
      ] },
      { id: "g_n7i9p98", name: "G27", monsters: [
        { id: "m_3lpu597", ref: "tormented_spectre", x: 1161, y: 727 },
        { id: "m_m3rcez1", ref: "witchreef_lasher", x: 1160, y: 717 },
        { id: "m_mfhu68r", ref: "witchreef_lasher", x: 1170, y: 721 },
        { id: "m_d6n42rw", ref: "witchreef_lasher", x: 1171, y: 732 },
        { id: "m_7zkv236", ref: "witchreef_lasher", x: 1152, y: 724 },
        { id: "m_3nebbel", ref: "witchreef_lasher", x: 1156, y: 734 }
      ] },
      { id: "g_1rzhar6", name: "G28", monsters: [
        { id: "m_39nrtrn", ref: "witchreef_lasher", x: 1072, y: 840 },
        { id: "m_al5evyg", ref: "witchreef_lasher", x: 1068, y: 849 },
        { id: "m_hekj34g", ref: "witchreef_lasher", x: 1078, y: 848 }
      ] },
      { id: "g_buwqxuq", name: "G29", monsters: [
        { id: "m_sha3tg1", ref: "witchreef_lasher", x: 1034, y: 875 },
        { id: "m_b6ywrl6", ref: "witchreef_lasher", x: 1036, y: 885 }
      ] },
      { id: "g_usuigsr", name: "G30", monsters: [
        { id: "m_qi1yzh0", ref: "water_elemental", x: 1061, y: 920 }
      ] },
      { id: "g_ry46sil", name: "G31", monsters: [
        { id: "m_jt0rjfr", ref: "water_elemental", x: 1126, y: 905 }
      ] },
      { id: "g_rj5rt02", name: "G32", monsters: [
        { id: "m_mkh38gh", ref: "witchreef_lasher", x: 1158, y: 884 },
        { id: "m_3olsj8a", ref: "witchreef_lasher", x: 1166, y: 878 }
      ] },
      { id: "g_5l0lo1i", name: "G33", monsters: [
        { id: "m_y6bkdnv", ref: "witchreef_lasher", x: 1150, y: 921 },
        { id: "m_nua6g2h", ref: "witchreef_lasher", x: 1160, y: 918 },
        { id: "m_5s4zyo6", ref: "witchreef_lasher", x: 1156, y: 927 }
      ] },
      { id: "g_nuhdau5", name: "G34", monsters: [
        { id: "m_wurigp3", ref: "deepbound_magi", x: 1292, y: 830 },
        { id: "m_gh26kg1", ref: "vengeful_shade", x: 1293, y: 817 },
        { id: "m_cd70tc3", ref: "tormented_spectre", x: 1297, y: 839 },
        { id: "m_up3tyjn", ref: "lost_soul", x: 1301, y: 820 },
        { id: "m_v21tr9c", ref: "lost_soul", x: 1304, y: 829 },
        { id: "m_7ef7dpa", ref: "lost_soul", x: 1304, y: 839 }
      ] },
      { id: "g_08gijcv", name: "G35", monsters: [
        { id: "m_xu7q9yt", ref: "vengeful_shade", x: 1375, y: 810 },
        { id: "m_yki0jf7", ref: "vengeful_shade", x: 1369, y: 818 }
      ] },
      { id: "g_b7bg3bt", name: "G36", monsters: [
        { id: "m_r54cs15", ref: "fading_raider", x: 1363, y: 738 },
        { id: "m_fa1kf3m", ref: "fading_raider", x: 1357, y: 748 },
        { id: "m_g9dx4bl", ref: "fading_raider", x: 1367, y: 747 }
      ] },
      { id: "g_1x57o67", name: "G37", monsters: [
        { id: "m_20xs56c", ref: "witchreef_lasher", x: 1399, y: 663 },
        { id: "m_9z429pl", ref: "witchreef_lasher", x: 1397, y: 672 }
      ] },
      { id: "g_b3s24zw", name: "G38", monsters: [
        { id: "m_34f5xyc", ref: "witchreef_lasher", x: 1324, y: 670 },
        { id: "m_ytkv5p1", ref: "witchreef_lasher", x: 1333, y: 677 }
      ] },
      { id: "g_s9yusto", name: "G39", monsters: [
        { id: "m_az52vxt", ref: "water_elemental", x: 1374, y: 650 }
      ] },
      { id: "g_9uyqb3k", name: "G40", monsters: [
        { id: "m_q10tthx", ref: "witchreef_lasher", x: 1357, y: 613 }
      ] },
      { id: "g_0szre8z", name: "G41", monsters: [
        { id: "m_t0xaoy5", ref: "witchreef_lasher", x: 1375, y: 574 },
        { id: "m_earxsbz", ref: "witchreef_lasher", x: 1387, y: 574 }
      ] },
      { id: "g_c9tu30e", name: "G42", monsters: [
        { id: "m_6gdox1c", ref: "vengeful_shade", x: 1344, y: 535 },
        { id: "m_nosktf2", ref: "vengeful_shade", x: 1358, y: 532 }
      ] },
      { id: "g_oszpjlf", name: "G43", monsters: [
        { id: "m_8viww4s", ref: "deepbound_magi", x: 1323, y: 464 },
        { id: "m_hem6mlp", ref: "tormented_spectre", x: 1325, y: 474 },
        { id: "m_x8pv0is", ref: "fading_raider", x: 1315, y: 470 },
        { id: "m_a09k69j", ref: "fading_raider", x: 1333, y: 467 },
        { id: "m_sci575n", ref: "lost_soul", x: 1313, y: 460 },
        { id: "m_y55lxrk", ref: "lost_soul", x: 1328, y: 457 }
      ] },
      { id: "g_b6o77me", name: "G44", monsters: [
        { id: "m_y6ormxf", ref: "hollowed_corsair", x: 1298, y: 398 },
        { id: "m_78gb0vf", ref: "fading_raider", x: 1304, y: 402 }
      ] },
      { id: "g_qusy3mm", name: "G45", monsters: [
        { id: "m_tlmdhpv", ref: "fading_raider", x: 1248, y: 413 },
        { id: "m_whjlm5g", ref: "lost_soul", x: 1251, y: 406 }
      ] },
      { id: "g_kukku0v", name: "G46", monsters: [
        { id: "m_u5tpk8q", ref: "dire_rat", x: 1309, y: 348 },
        { id: "m_15pm4is", ref: "dire_rat", x: 1302, y: 357 },
        { id: "m_0yxe3mc", ref: "dire_rat", x: 1312, y: 357 }
      ] },
      { id: "g_h86ugb1", name: "G47", monsters: [
        { id: "m_navpkvl", ref: "vengeful_shade", x: 1236, y: 343 },
        { id: "m_fg46y4m", ref: "vengeful_shade", x: 1234, y: 356 },
        { id: "m_8vquooi", ref: "lost_soul", x: 1226, y: 347 }
      ] },
      { id: "g_1y2roi7", name: "G48", monsters: [
        { id: "m_9uuz6rr", ref: "lost_soul", x: 1181, y: 322 },
        { id: "m_kz2dm75", ref: "lost_soul", x: 1190, y: 324 },
        { id: "m_h66d8ng", ref: "lost_soul", x: 1184, y: 328 }
      ] },
      { id: "g_8lettii", name: "G49", monsters: [
        { id: "m_1trmh9e", ref: "tormented_spectre", x: 1269, y: 307 },
        { id: "m_u9qwxkk", ref: "tormented_spectre", x: 1276, y: 314 }
      ] },
      { id: "g_987d3zr", name: "G50", monsters: [
        { id: "m_newmjox", ref: "dire_rat", x: 1144, y: 351 },
        { id: "m_qj5bfoc", ref: "dire_rat", x: 1139, y: 356 },
        { id: "m_xmq8w09", ref: "dire_rat", x: 1147, y: 360 }
      ] }
    ]
  },
  {
    id: "godfall",
    name: "Godfall Quarry",
    url: "maps/GodfallQuarry.webp",
    width: 2048,
    height: 1024,
    requiredCount: 130,
    groups: [
      { id: "g_bxy2c3a", name: "G1", monsters: [
        { id: "m_xutahx5", ref: "dredge", x: 1200, y: 904 }
      ] },
      { id: "g_xnm6prz", name: "G2", monsters: [
        { id: "m_63yq64e", ref: "dredge", x: 1159, y: 900 },
        { id: "m_snejy0x", ref: "task_master", x: 1165, y: 904 }
      ] },
      { id: "g_m42nu8q", name: "G3", monsters: [
        { id: "m_8xf63au", ref: "task_master", x: 1161, y: 937 },
        { id: "m_7lzy721", ref: "dredge", x: 1161, y: 928 },
        { id: "m_c01el8u", ref: "dredge", x: 1169, y: 933 }
      ] },
      { id: "g_g4tlnnm", name: "G4", monsters: [
        { id: "m_m153gf7", ref: "godfall_wardstone", x: 1112, y: 924 },
        { id: "m_514jrfk", ref: "skittershard", x: 1116, y: 930 },
        { id: "m_rpweaxx", ref: "skittershard", x: 1120, y: 923 },
        { id: "m_27s6i80", ref: "skittershard", x: 1124, y: 930 }
      ] },
      { id: "g_2ecm362", name: "G5", monsters: [
        { id: "m_ua0rsma", ref: "task_master", x: 1175, y: 837 },
        { id: "m_a1o15qg", ref: "dredge", x: 1165, y: 834 },
        { id: "m_fw8o260", ref: "dredge", x: 1177, y: 849 },
        { id: "m_0xd2u9s", ref: "nezari_bolter", x: 1169, y: 845 },
        { id: "m_4gz7drj", ref: "nezari_bolter", x: 1163, y: 841 }
      ] },
      { id: "g_eqqk4qd", name: "G6", monsters: [
        { id: "m_rd3j8m7", ref: "task_master", x: 1137, y: 798 },
        { id: "m_8qrg7vy", ref: "dredge", x: 1124, y: 801 },
        { id: "m_9r2vjhr", ref: "dredge", x: 1132, y: 809 },
        { id: "m_xjubd7i", ref: "dredge", x: 1142, y: 805 }
      ] },
      { id: "g_p0q0tj3", name: "G7", monsters: [
        { id: "m_6qklv5a", ref: "task_master", x: 1088, y: 901 },
        { id: "m_dqar3p8", ref: "dredge", x: 1083, y: 909 },
        { id: "m_jqtki6y", ref: "dredge", x: 1078, y: 899 },
        { id: "m_ufeiq8d", ref: "skittershard", x: 1083, y: 892 },
        { id: "m_ex532xc", ref: "skittershard", x: 1092, y: 893 }
      ] },
      { id: "g_eaa4pme", name: "G8", monsters: [
        { id: "m_p3a1e1a", ref: "skittershard", x: 1115, y: 872 },
        { id: "m_1ua0mqa", ref: "skittershard", x: 1122, y: 864 },
        { id: "m_aar4r15", ref: "skittershard", x: 1127, y: 858 },
        { id: "m_0ss9flk", ref: "dredge", x: 1125, y: 872 },
        { id: "m_zw4gacs", ref: "dredge", x: 1130, y: 867 }
      ] },
      { id: "g_tmeofhu", name: "G9", monsters: [
        { id: "m_tep0blf", ref: "enforcer", x: 1088, y: 853 }
      ] },
      { id: "g_4oh2j8q", name: "G10", monsters: [
        { id: "m_aau37sp", ref: "dredge", x: 1060, y: 867 },
        { id: "m_2mzlgd5", ref: "dredge", x: 1065, y: 874 }
      ] },
      { id: "g_cnpwegm", name: "G11", monsters: [
        { id: "m_ekcnhfh", ref: "task_master", x: 1026, y: 854 },
        { id: "m_e7dbs9z", ref: "task_master", x: 1024, y: 838 },
        { id: "m_x062hay", ref: "dredge", x: 1021, y: 845 },
        { id: "m_cffvwfa", ref: "dredge", x: 1010, y: 838 },
        { id: "m_5ykbz57", ref: "dredge", x: 1015, y: 854 },
        { id: "m_beb7v4q", ref: "skittershard", x: 1010, y: 848 },
        { id: "m_69ojibc", ref: "skittershard", x: 1000, y: 843 },
        { id: "m_uqr7kq5", ref: "skittershard", x: 1004, y: 855 }
      ] },
      { id: "g_azscrbs", name: "G12", monsters: [
        { id: "m_iq89jze", ref: "skittershard", x: 1061, y: 782 },
        { id: "m_0wp6mvv", ref: "skittershard", x: 1069, y: 786 },
        { id: "m_jto0zff", ref: "skittershard", x: 1078, y: 791 },
        { id: "m_2izcwfl", ref: "godfall_wardstone", x: 1066, y: 793 }
      ] },
      { id: "g_t0vasaj", name: "G13", monsters: [
        { id: "m_f0df47n", ref: "nezari_bolter", x: 1025, y: 768 },
        { id: "m_2rlo9s7", ref: "nezari_bolter", x: 1019, y: 775 }
      ] },
      { id: "g_5or3zqw", name: "G14", monsters: [
        { id: "m_sqwc0ay", ref: "enforcer", x: 973, y: 762 },
        { id: "m_dv65sqr", ref: "dredge", x: 966, y: 754 },
        { id: "m_yl11gw7", ref: "dredge", x: 962, y: 763 }
      ] },
      { id: "g_1ugp2ly", name: "G15", monsters: [
        { id: "m_m93opn2", ref: "dredge", x: 933, y: 729 },
        { id: "m_gajkzfi", ref: "dredge", x: 920, y: 736 },
        { id: "m_1susrpw", ref: "task_master", x: 929, y: 735 },
        { id: "m_x57utq0", ref: "quarry_stalker", x: 922, y: 727 }
      ] },
      { id: "g_fjacyqa", name: "G16", monsters: [
        { id: "m_arna3bg", ref: "task_master", x: 898, y: 803 },
        { id: "m_6ahzjfn", ref: "dredge", x: 889, y: 799 },
        { id: "m_ef0ar16", ref: "dredge", x: 906, y: 801 }
      ] },
      { id: "g_linclmj", name: "G17", monsters: [
        { id: "m_6b7dxk9", ref: "task_master", x: 872, y: 845 },
        { id: "m_ceauivd", ref: "task_master", x: 867, y: 854 },
        { id: "m_r0wk8r9", ref: "nezari_bolter", x: 859, y: 849 },
        { id: "m_4enlgv4", ref: "nezari_bolter", x: 852, y: 843 }
      ] },
      { id: "g_1dyznwm", name: "G18", monsters: [
        { id: "m_0q78vbp", ref: "quarry_stalker", x: 837, y: 810 },
        { id: "m_i4al67o", ref: "quarry_stalker", x: 832, y: 817 }
      ] },
      { id: "g_g1lnazm", name: "G19", monsters: [
        { id: "m_so22ux6", ref: "arcane_warden", x: 855, y: 766 },
        { id: "m_h185ugq", ref: "enforcer", x: 864, y: 761 },
        { id: "m_cjmu8dd", ref: "enforcer", x: 846, y: 769 },
        { id: "m_5es2nff", ref: "skittershard", x: 855, y: 757 },
        { id: "m_spw29nd", ref: "skittershard", x: 847, y: 759 },
        { id: "m_o8sf71h", ref: "nezari_bolter", x: 862, y: 769 },
        { id: "m_q8rpdk4", ref: "nezari_bolter", x: 855, y: 773 }
      ] },
      { id: "g_86i996m", name: "G20", monsters: [
        { id: "m_p5vnifl", ref: "dredge", x: 831, y: 708 },
        { id: "m_a857afh", ref: "dredge", x: 821, y: 711 },
        { id: "m_iiqji3l", ref: "skittershard", x: 827, y: 701 },
        { id: "m_ap0mz7c", ref: "skittershard", x: 818, y: 703 }
      ] },
      { id: "g_xatffqk", name: "G21", monsters: [
        { id: "m_nwnqqo7", ref: "enraged_earth_elemental", x: 786, y: 676 },
        { id: "m_wyw1qx0", ref: "godfall_wardstone", x: 785, y: 666 },
        { id: "m_9q5j8gz", ref: "godfall_wardstone", x: 777, y: 681 },
        { id: "m_xkgdxxp", ref: "dredge", x: 795, y: 672 },
        { id: "m_z5f0cvz", ref: "dredge", x: 791, y: 682 }
      ] },
      { id: "g_rhj1ysq", name: "G22", monsters: [
        { id: "m_j5skn21", ref: "task_master", x: 770, y: 638 },
        { id: "m_t7wl7by", ref: "dredge", x: 779, y: 635 },
        { id: "m_sqfpk6x", ref: "dredge", x: 778, y: 644 },
        { id: "m_36jhpc0", ref: "skittershard", x: 788, y: 636 },
        { id: "m_60dyzyt", ref: "skittershard", x: 787, y: 645 }
      ] },
      { id: "g_2zbxhn6", name: "G23", monsters: [
        { id: "m_f5i7vo1", ref: "skittershard", x: 837, y: 663 },
        { id: "m_o07obm3", ref: "skittershard", x: 845, y: 666 },
        { id: "m_ud2gi1d", ref: "dredge", x: 844, y: 657 }
      ] },
      { id: "g_wdtmfn2", name: "G24", monsters: [
        { id: "m_3e4jwc8", ref: "task_master", x: 886, y: 595 },
        { id: "m_z6tajk3", ref: "dredge", x: 894, y: 590 },
        { id: "m_np2x879", ref: "dredge", x: 894, y: 598 }
      ] },
      { id: "g_cxazc69", name: "G25", monsters: [
        { id: "m_b21b54g", ref: "dredge", x: 822, y: 593 }
      ] },
      { id: "g_yiaxb4n", name: "G26", monsters: [
        { id: "m_rigfswb", ref: "dredge", x: 826, y: 571 }
      ] },
      { id: "g_b2wdkxg", name: "G27", monsters: [
        { id: "m_opsggcm", ref: "dredge", x: 819, y: 543 }
      ] },
      { id: "g_jxe9a02", name: "G28", monsters: [
        { id: "m_fc1xd5s", ref: "dredge", x: 867, y: 539 }
      ] },
      { id: "g_l18riht", name: "G29", monsters: [
        { id: "m_n8b6yfs", ref: "dredge", x: 886, y: 566 }
      ] },
      { id: "g_rciuh64", name: "G30", monsters: [
        { id: "m_57vun4b", ref: "task_master", x: 862, y: 572 },
        { id: "m_6am8aal", ref: "task_master", x: 855, y: 572 }
      ] },
      { id: "g_h44mhxx", name: "G31", monsters: [
        { id: "m_3kgpmc8", ref: "enraged_earth_elemental", x: 778, y: 557 },
        { id: "m_oabblo3", ref: "arcane_warden", x: 771, y: 552 },
        { id: "m_jukcb2n", ref: "arcane_warden", x: 771, y: 560 },
        { id: "m_sivbfvj", ref: "dredge", x: 771, y: 543 },
        { id: "m_qvsoyh0", ref: "dredge", x: 771, y: 533 },
        { id: "m_ua4x7hm", ref: "dredge", x: 777, y: 531 },
        { id: "m_0ijm2o9", ref: "dredge", x: 772, y: 570 },
        { id: "m_1bxdvlw", ref: "dredge", x: 773, y: 580 },
        { id: "m_k3sehvx", ref: "dredge", x: 780, y: 581 }
      ] },
      { id: "g_wk2pdn3", name: "G32", monsters: [
        { id: "m_5vh9ynp", ref: "task_master", x: 814, y: 517 }
      ] },
      { id: "g_0o9n8ds", name: "G33", monsters: [
        { id: "m_fes02fm", ref: "skittershard", x: 892, y: 444 },
        { id: "m_qf1dfpk", ref: "skittershard", x: 886, y: 446 },
        { id: "m_msoafja", ref: "skittershard", x: 879, y: 448 }
      ] },
      { id: "g_x4ffdvv", name: "G34", monsters: [
        { id: "m_7b2zxwf", ref: "enraged_earth_elemental", x: 942, y: 445 },
        { id: "m_p8zf747", ref: "arcane_warden", x: 952, y: 441 },
        { id: "m_kuc1umu", ref: "godfall_wardstone", x: 933, y: 434 },
        { id: "m_w91o5rg", ref: "godfall_wardstone", x: 933, y: 453 },
        { id: "m_u7jp7b7", ref: "skittershard", x: 932, y: 443 },
        { id: "m_dwz0eaj", ref: "skittershard", x: 945, y: 437 },
        { id: "m_t2a8vgx", ref: "skittershard", x: 946, y: 453 }
      ] },
      { id: "g_ig8fcze", name: "G35", monsters: [
        { id: "m_upi1d9u", ref: "skittershard", x: 1006, y: 336 },
        { id: "m_1nuufpz", ref: "skittershard", x: 997, y: 340 },
        { id: "m_uf9ilzs", ref: "skittershard", x: 993, y: 349 },
        { id: "m_ku3igxh", ref: "dredge", x: 1002, y: 346 },
        { id: "m_tsa90a2", ref: "dredge", x: 1008, y: 343 },
        { id: "m_egaroxk", ref: "dredge", x: 1007, y: 353 }
      ] },
      { id: "g_038tvnw", name: "G36", monsters: [
        { id: "m_u4y897z", ref: "arcane_warden", x: 963, y: 350 },
        { id: "m_gfmqa1r", ref: "godfall_wardstone", x: 954, y: 342 },
        { id: "m_zh5vqmk", ref: "godfall_wardstone", x: 953, y: 372 },
        { id: "m_ad5ni03", ref: "dredge", x: 954, y: 351 },
        { id: "m_eg5apzm", ref: "dredge", x: 958, y: 359 },
        { id: "m_u2fyads", ref: "dredge", x: 965, y: 358 },
        { id: "m_2lslom1", ref: "skittershard", x: 952, y: 362 },
        { id: "m_z0fqiga", ref: "skittershard", x: 958, y: 367 },
        { id: "m_yduwd97", ref: "skittershard", x: 964, y: 366 }
      ] },
      { id: "g_w3r2z3h", name: "G37", monsters: [
        { id: "m_m631xtp", ref: "dredge", x: 884, y: 516 }
      ] }
    ]
  },
  {
    id: "scryers",
    name: "Scryer's Peak",
    url: "maps/ScryersPeak.webp",
    width: 2048,
    height: 1024,
    requiredCount: 180,
    groups: []
  },
  {
    id: "silken",
    name: "Silken Hollow",
    url: "maps/SilkenHollow.webp",
    width: 2048,
    height: 1024,
    requiredCount: 168,
    groups: []
  },
  {
    id: "urrak",
    name: "Urrak Markets",
    url: "maps/UrrakMarkets.webp",
    width: 2048,
    height: 1024,
    requiredCount: 160,
    groups: []
  },
  {
    id: "cithrel",
    name: "Cithrel's Fall",
    url: "maps/CithrelsFall.webp",
    width: 2048,
    height: 1024,
    requiredCount: 188,
    groups: []
  }
];
