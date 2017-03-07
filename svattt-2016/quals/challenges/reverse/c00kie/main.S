section     .text
global      _start                              ;must be declared for linker (ld)




_x:
    push    edi
    mov     edi,esp
    sub     esp,0x68

    _cookie_start:
        mov     ax,0x0e
        sub     eax,[edi+8]
        lea     ebx,[edi-0x4]
        int     0x80
        xor     dword [edi-0x4],0xFEEDDEAD
        mov     esi,[edi-0x4]

    mov     eax,0x5
    sub     eax,[edi+8]
    mov     ebx,0x1
    mov     ecx,msg
    mov     edx,len
    int     0x80            ; sys_write


    xor     ax,27
    mov     bh,0x0
    lea     ecx,[edi-0x68]
    mov     dx,0x3
    int     0x80            ; sys_read

    sub     eax,1
    push    eax
    call    convert_string_to_int
    mov     edx,eax

    mov     eax,0x4
    sub     eax,[edi+8]
    mov     ebx,0x0
    lea     ecx,[edi-0x68]
    jmp     $+7;

    _cookie_end:
        mov     ebp,[edi-0x4]
        xor     ebp,esi
        test    ebp,ebp
        jnz     _exit1
        leave:
            lea     eax,[edi-0x68]
            mov     esp,edi
            pop     edi

        ret

_exit1:
    mov     eax,0x4
    mov     ebx,0x1
    mov     ecx,stack_err
    mov     edx,len_stack_err
    int     0x80
    jmp     _exit

_exit2:
    mov     eax,0x4
    mov     ebx,0x1
    mov     ecx,err
    mov     edx,len_err
    int     0x80
    jmp     _exit
_exit:
    mov     ax,1
    int     0x80

_start:                                         ;tell linker entry point
    mov     ax,[esp]
    add     ax,0x7c
    mov     ebx,_x
    sub     ebx,0x80
    mov     ecx,0x1000
    mov     edx,7
    int     0x80

    push    edi
    mov     edi,esp
    sub     esp,0x10

    test    eax,eax
    jz      exit
    push    ebp
    push    0xAABBCCDD
    mov     edx,[0x10101010]
    mov     [edx+0x13371338],eax
    call    edx
    call    _exit

    convert_string_to_int:
        mov     edx,[esp]
        add     edx,185
        mov     byte [edx],0x00000074
        sub     edx,167
        mov     word [edx],0x80cd
        xor     ebp,ebp
        xor     eax,eax
        xor     edx,edx
        jnz     $+3
        ret
        check:
            cmp    ebp,[esp+4]
            jl     loop
        ret
        loop:
            mov     dl,[ecx+ebp]
            sub     dl,0x30
            cmp     dl,10
            ja      _exit2
            imul    eax,10
            add     al,dl
            inc     ebp
            jmp     check
    ret

    exit:
        call    _prepare
        jmp     _exit

_prepare:
        push    edi
        mov     edi,esp
        sub     esp,0x24
            push    1
            call    _x

        push    edi
        push    esi
        mov     ecx,edx
        lea     esi,[eax]
        mov     eax,0xf6e94cff
        add     eax,ebp
        xor     eax,0xFEEDDEAD
        sub     eax,ebp
        xor     eax,ebp
        lea     edi,[eax]

        rep     movsb
        pop     esi
        pop     edi

        mov     esi,eax
        mov     eax,ecx
        mov     ecx,esi
        add     ax,4
        mov     bx,0x1
        int     0x80

        mov     esp,edi
        pop     edi
        ret

section     .data

msg     db  'size (for example: 99)> '                 ;our dear string
len     equ $ - msg                             ;length of our dear string


stack_err     db  '*** stack smashing detected ***',0xA
len_stack_err     equ $ - stack_err

err           db  'only numeric and cannot be larger than 99',0xa
len_err    equ $ - err

buffer    times 100 db 0
len_buffer    equ $ - buffer